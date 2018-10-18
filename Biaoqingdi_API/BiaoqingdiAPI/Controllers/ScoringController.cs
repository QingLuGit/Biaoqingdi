using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;
using System.Web.Http;
using System.Web.Script.Serialization;
using System.Threading.Tasks;
using Microsoft.ProjectOxford.Face;

namespace BiaoqingdiAPI.Controllers
{
    public class ScoringController : ApiController
    {
        [Route("api/scoring")]
        [HttpPost]
        public async Task<string> record()
        {
            if (!Request.Content.IsMimeMultipartContent())
            {
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            }
            string fileSaveLocation = HttpContext.Current.Server.MapPath("~/App_Data");
            CustomMultipartFormDataStreamProvider provider = new CustomMultipartFormDataStreamProvider(fileSaveLocation);
            List<string> files = new List<string>();
            Dictionary<string, string> dic = new Dictionary<string, string>();
            try
            {
                await Request.Content.ReadAsMultipartAsync(provider);
                foreach (MultipartFileData file in provider.FileData)
                {//接收FileData
                    files.Add(file.LocalFileName);
                }
                foreach (var key in provider.FormData.AllKeys)
                {//接收FormData  
                    dic.Add(key, provider.FormData[key]);
                }

                using (var fStream = File.OpenRead(files[0]))
                {
                    try
                    {
                        string subscriptionKey = "5eb132588abc4bfd9824cd6eb478bcde";
                        string endpoint = "https://eastasia.api.cognitive.microsoft.com/face/v1.0";
                        var faceServiceClient = new FaceServiceClient(subscriptionKey, endpoint);
                        Microsoft.ProjectOxford.Face.Contract.Face[] faces = await faceServiceClient.DetectAsync(fStream, false, true, new FaceAttributeType[] { FaceAttributeType.Gender, FaceAttributeType.Age, FaceAttributeType.Emotion });
                        if(faces.Length == 0)
                        {
                            return "Error: no face detected.";
                        }

                        var emotionScores = faces[0].FaceAttributes.Emotion;
                        string emotion = dic["emotion"];
                        double score = 0;

                        if(emotion == "开心")
                        {
                            score = emotionScores.Happiness;
                        }
                        else if(emotion == "生气")
                        {
                            score = emotionScores.Anger;
                        }
                        else if(emotion == "害怕")
                        {
                            score = emotionScores.Fear;
                        }
                        else if (emotion == "悲伤")
                        {
                            score = emotionScores.Sadness;
                        }
                        else if (emotion == "惊喜")
                        {
                            score = emotionScores.Surprise;
                        }
                        else if (emotion == "厌恶")
                        {
                            score = emotionScores.Disgust;
                        }
                        else if (emotion == "蔑视")
                        {
                            score = emotionScores.Contempt;
                        }
                        else if (emotion == "面无表情")
                        {
                            score = emotionScores.Neutral;
                        }

                        string scoreStr = "匹配度" + (int)(score * 100) + "%";
                        string sentence = "";
                        if(score > 0.9)
                        {
                            sentence = "你是表情表演艺术家！";
                        }
                        else if(score > 0.6)
                        {
                            sentence = "你有演员天赋~";
                        }
                        else
                        {
                            sentence = "表演得不到位，再来一次~";
                        }

                        return scoreStr + "\n\r" + sentence;

                        // var json = new JavaScriptSerializer().Serialize(faces[0].FaceAttributes.Emotion);
                        // return json;
                    }
                    catch (FaceAPIException ex)
                    {
                        return "Error： " + ex.ErrorMessage;
                    }
                }
            }
            catch (System.Exception e)
            {
                //return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, "Error： " + e.Message);
                return "Error： " + e.Message;
            }
        }

        public class CustomMultipartFormDataStreamProvider : MultipartFormDataStreamProvider
        {
            public CustomMultipartFormDataStreamProvider(string path) : base(path) { }
            public override string GetLocalFileName(HttpContentHeaders headers)
            {
                return headers.ContentDisposition.FileName.Replace("\"", string.Empty);
            }
        }
    }
}

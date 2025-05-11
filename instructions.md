# API Usage Documentation for Radio Station Reports

This document provides a comprehensive guide on how to interact with three APIs hosted at the base URL `https://norway.radiostation.ai`. The APIs allow you to generate **news**, **weather**, and **traffic** reports. For all requests, make sure to include the required headers and follow the body guidelines to avoid errors.

## General Requirements

1. **Base URL**: `https://norway.radiostation.ai`
2. **Content-Type**: All requests must include the header:
   ```http
   Content-Type: application/json
   ```

3. **Request Methods**: All the APIs require a POST request.
4. **Response Codes**: 
   - `200 OK`: Success
   - `400 Bad Request`: Incorrect body or missing required fields.
   - `500 Internal Server Error`: Server-side issues.

## API Endpoints

### 1. **Generate News Report**
   - **Endpoint**: `/api/news`
   - **Method**: POST
   - **URL**: `https://norway.radiostation.ai/api/news`
   - **Headers**: 
     ```http
     Content-Type: application/json
     ```
   - **Body**: You must provide a JSON body containing **voice_code**, **location_code** and **lang**. Optionally, you can provide an **intro**. **outro** and **number_of_stories** to customize the report.

   #### Example Request
   ```http
   POST https://norway.radiostation.ai/api/news
   Content-Type: application/json

    {
      "voice_code":"voice_code_1"
      "location_code":"no",
      "lang":"no",
      "intro": "Good morning, here are today's top stories.",
      "outro": "That concludes our news for today."
      "number_of_stories":1
    }
   ```

   - **Body Parameters**:
     - `voice_code` : A string that adds a voice of the news report.
     - `location_code` : A string that adds location of the news report.
     - `lang` : A string that adds a custom introduction to the news report.
     - `intro` (optional): A string that adds a custom introduction to the news report.
     - `outro` (optional): A string that adds a custom outro to the news report.
     - `number_of_stories` (optional):  A integer that selects the number of stories to generate. 1 means it will generate 3 stories one of each topic ["NATION", "ENTERTAINMENT", "SPORTS"].


### 2. **Generate News Report Script**
   - **Endpoint**: `/api/news_script`
   - **Method**: POST
   - **URL**: `https://norway.radiostation.ai/api/news_script`
   - **Headers**: 
     ```http
     Content-Type: application/json
     ```
   - **Body**: You must provide a JSON body containing **location_code** and **lang**. Optionally, you can provide an **number_of_story** to customize the number of responses if 1 is selected it will return 3 stories one of each topic.

   #### Example Request
   ```http
   POST https://norway.radiostation.ai/api/news_script
   Content-Type: application/json

   {
    "location_code":"no",
    "lang":"no",
    "number_of_stories":1
   }
   ```

   - **Body Parameters**:
     - `location_code`: A string that adds location of the news.
     - `lang` : A string that mentions language of the script/story.
     - `number_of_stories` (optional): A integer that selects the number of stories to generate. 1 means it will generate 3 stories one of each topic ["NATION", "ENTERTAINMENT", "SPORTS"].

### 3. **Enhance story**
   - **Endpoint**: `/api/enhance_story`
   - **Method**: POST
   - **URL**: `https://norway.radiostation.ai/api/enhance_story`
   - **Headers**: 
     ```http
     Content-Type: application/json
     ```
   - **Body**: You must provide a JSON body containing **story**, **lang** and **type**.

   #### Example Request
   ```http
   POST https://norway.radiostation.ai/api/enhance_story
   Content-Type: application/json

   {
    "story":"Tiltalt for IS-deltagelse. Nå må de norske søstrene møte i retten.  AftenpostenForskjellige forklaringer på hvorfor IS-tiltalte søstre dro til Syria  AdressaNorske søstre i retten: Hjalp de IS fra innsiden?  NRK RadioTo søstre: Rettssaken starter  VG.",
    "type":"news",
    "lang":"no"
   }
   ```
   - **Body Parameters**:
     - `story`: A string that we need to enhance.
     - `lang` : A string that mentions language of the script/story.
     - `type` : A styring that mentiones the type of script ["news", "weather", "traffic"].


### 4. **generate audio preview**
   - **Endpoint**: `/api/generate_audio_preview`
   - **Method**: POST
   - **URL**: `https://norway.radiostation.ai/api/generate_audio_preview`
   - **Headers**: 
     ```http
     Content-Type: application/json
     ```
   - **Body**: You must provide a JSON body containing **script** and **voice_code**.

   #### Example Request
   ```http
   POST https://norway.radiostation.ai/api/generate_audio_preview
   Content-Type: application/json

   {
    "script":"Tiltalt for IS-deltagelse. Nå må de norske søstrene møte i retten.  AftenpostenForskjellige forklaringer på hvorfor IS-tiltalte søstre dro til Syria  AdressaNorske søstre i retten: Hjalp de IS fra innsiden?  NRK RadioTo søstre: Rettssaken starter  VG.",
    "voice_code":"voice_id_1"
   }
   ```
   - **Body Parameters**:
     - `script`: A string that we need the audio preview of.
     - `voice_code` : A string that mentions which voice to use to generate speech.

### 5. **Generate Weather Report**
   - **Endpoint**: `/api/weather`
   - **Method**: POST
   - **URL**: `https://norway.radiostation.ai/api/weather`
   - **Headers**: 
     ```http
     Content-Type: application/json
     ```
   - **Body**: You must provide a JSON body containing **location_code**,**lang** and **voice_code**.

   #### Example Request
   ```http
   POST https://norway.radiostation.ai/api/weather
   Content-Type: application/json

   {
    "voice_code":"voice_code_1"
    "location_code":"no",
    "lang":"no"
   }
   ```
   - **Body Parameters**:
     - `voice_code` : A string that adds a voice of the weather report.
     - `location_code` : A string that adds location of the weather report.
     - `lang` : A string that adds a custom introduction to the weather report.


### 6. **Generate Weather script**
   - **Endpoint**: `/api/weather_script`
   - **Method**: POST
   - **URL**: `https://norway.radiostation.ai/api/weather_script`
   - **Headers**: 
     ```http
     Content-Type: application/json
     ```
   - **Body**: You must provide a JSON body containing **location_code** and **lang**.

   #### Example Request
   ```http
   POST https://norway.radiostation.ai/api/weather_script
   Content-Type: application/json

   {
    "location_code":"no",
    "lang":"no"
   }
   ```
   - **Body Parameters**:
     - `location_code` : A string that adds location of the weather report.
     - `lang` : A string that adds a custom introduction to the wetaher report.


### 7. **Generate Traffic Report**
   - **Endpoint**: `/api/traffic`
   - **Method**: POST
   - **URL**: `https://norway.radiostation.ai/api/traffic`
   - **Headers**: 
     ```http
     Content-Type: application/json
     ```
   - **Body**: You must provide a JSON body containing **voice_code**. Optionally, you can provide an **intro** to customize the report.

   #### Example Request
   ```http
   POST https://norway.radiostation.ai/api/traffic
   Content-Type: application/json

   {
     "intro": "Here is your morning traffic update."
     "voice_code" : "voice_code_1"
   }
   ```

   - **Body Parameters**:
     - `voice_code` : A string that adds a voice of the traffic report.
     - `intro` (optional): A string that adds a custom introduction to the traffic report.


  
### 8. **Generate Traffic Script**
   - **Endpoint**: `/api/traffic_script`
   - **Method**: POST
   - **URL**: `https://norway.radiostation.ai/api/traffic_script`
   - **Headers**: 
     ```http
     Content-Type: application/json
     ```
   - **Body**: You must provide a JSON body, even if it's empty (`{}`). Optionally, you can provide an **intro** to customize the report.

   #### Example Request
   ```http
   POST https://norway.radiostation.ai/api/traffic_script
   Content-Type: application/json

   {
     "intro": "Here is your morning traffic update."
   }
   ```

   - **Body Parameters**:
     - `intro` (optional): A string that adds a custom introduction to the traffic report.

   #### Empty Body Example
   If you don’t need an intro, you must still provide an empty JSON object (`{}`) in the body:
   ```http
   POST https://norway.radiostation.ai/api/traffic_script
   Content-Type: application/json

   {}
   ```

### 9. **Generate audio from Script**
   - **Endpoint**: `/api/generate_audio`
   - **Method**: POST
   - **URL**: `https://norway.radiostation.ai/api/generate_audio`
   - **Headers**: 
     ```http
     Content-Type: application/json
     ```
   - **Body**: You must provide a JSON body. You need to provide an **combined_text** and **filename** and **voice_code** to generate speech from the script and filename to save the audio in firebase.

   #### Example Request
   ```http
   POST https://norway.radiostation.ai/api/generate_audio
   Content-Type: application/json

   {
    "combined_text": "string",
    "filename": "Norway-news.mp3",
    "voice_code": "voice_code_1"
   }
   ```

### 10. **Generate audio from Script for callers preview**
   - **Endpoint**: `/api/callers-preview`
   - **Method**: POST
   - **URL**: `https://norway.radiostation.ai/api/callers-preview`
   - **Headers**: 
     ```http
     Content-Type: application/json
     ```
   - **Body**: You must provide a JSON body. You need to provide an **voiceID** and **voiceCategory** and **script** to generate speech from the script.

   #### Example Request
   ```http
   POST https://norway.radiostation.ai/api/callers-preview
   Content-Type: application/json

  {
    "voiceID": "string",
    "voiceCategory": "string",
    "script": "string"
  }
   ```

### 11. **Generate audio from Script for callers export**
   - **Endpoint**: `/api/callers-export`
   - **Method**: POST
   - **URL**: `https://norway.radiostation.ai/api/callers-preview`
   - **Headers**: 
     ```http
     Content-Type: application/json
     ```
   - **Body**: You must provide a JSON body. You need to provide an **voiceID** and **voiceCategory** and **script** to generate speech from the script.

   #### Example Request
   ```http
   POST https://norway.radiostation.ai/api/callers-preview
   Content-Type: application/json

  {
    "voiceID": "string",
    "voiceCategory": "string",
    "script": "string"
  }
   ```



## Summary of Endpoints

| API                                   | Method | URL                                                          | Body Requirements       |
|---------------------------------------|--------|--------------------------------------------------------------|-------------------------|
| News Report                           | POST   | `https://norway.radiostation.ai/api/news`                    | JSON body required      |                   
| Weather Report                        | POST   | `https://norway.radiostation.ai/api/weather`                 | JSON body required      |
| Traffic Report                        | POST   | `https://norway.radiostation.ai/api/traffic`                 | JSON body required      |
| News Report Script                    | POST   | `https://norway.radiostation.ai/api/news_script`             | JSON body required      |
| enhance_story                         | POST   | `https://norway.radiostation.ai/api/enhance_story`           | JSON body required      |
| generate_audio_preview                | POST   | `https://norway.radiostation.ai/api/generate_audio_preview`  | JSON body required      |
| Weather Report Script                 | POST   | `https://norway.radiostation.ai/api/weather_script`          | JSON body required      |
| Traffic Report Script                 | POST   | `https://norway.radiostation.ai/api/traffic_script`          | JSON body required      |
| Generate audio                        | POST   | `https://norway.radiostation.ai/api/generate_audio`          | JSON body required      |
| Generate callers audio preview        | POST   | `https://norway.radiostation.ai/api/callers-preview`         | JSON body required      |
| Generate callerss audio export        | POST   | `https://norway.radiostation.ai/api/callers-export`          | JSON body required      |
| List Countries                        | GET    | `https://norway.radiostation.ai/countries`                   | NO body required        |
| List Voices                           | GET    | `https://norway.radiostation.ai/voices`                      | NO body required        |
| List callers Voices                   | GET    | `https://norway.radiostation.ai/caller-voices`               | NO body required        |

### Key Notes:
- Always include the header `Content-Type: application/json` in all requests.
- For `/api/news`, `/api/traffic`, `/api/news_script` and `api/traffic_script` etc., ensure you provide a JSON body.
- The `/countries`, `/voices`, `/caller-voices` endpoint does not require a JSON body.

This concludes the API documentation for the news, weather, and traffic report generation at `norway.radiostation.ai`. Make sure to adhere to the guidelines for smooth API interaction.
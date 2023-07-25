const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 3000
const fetch = require('node-fetch')

function getChoiceId(answer) {
    switch (answer) {
        case 'very dissatisfied':
            return "672766515"
            break
        case 'dissatisfied':
            return "672766516"
            break
        case 'neutral':
            return "672766517"
            break
        case 'satisfied':
            return "672766518"
            break
        case 'very satisfied':
            return "672766519"
            break
    }
}
const exampleRequestBody = {
    "custom_variables": {},
    "custom_value": "",
    "date_created": "2022-08-12T21:57:14+00:00",
    "response_status": "completed",
    "ip_address": "",
    "recipient_id": 1234,
    "pages": [
        {
            "id": "30915926",
            "questions": [
                {
                    "id": "85550481",
                    "variable_id": "",
                    "answers": {
                        "choice_id": getChoiceId('neutral'),
                        "row_id": "",
                        "col_id": "",
                        "other_id": "",
                        "text": ""
                    }
                }
            ]
        }
    ]
}

// stringified twice because they do it in their API docs in order to escape chars
const requestBody = JSON.stringify(JSON.stringify(exampleRequestBody))

express()
    .use(express.static(path.join(__dirname, 'public')))
    .post('/rating', (req, res) => {
        fetch("https://api.surveymonkey.com/v3/collectors/447099939/responses", {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer tOt-QCvM5tKO73Krcx3KweLYXNYavp3o347bGd3Yfbz9A.-f-y86w.P0tjIc0QDdz-5x.uGIjzZINt6xCF9zXjndw94GLNGWvbzP4TKp7JjqTVgMHaLudzbpaFxvkIHt"
            },
            "body": requestBody
        })
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log(data)
                res.send(`<div style="line-height:1.8; font-family: sans-serif; font-size: 18px"><p>API response was:<br/> ${JSON.stringify(data)}</p><p>The request body we sent to the API was:<br/> ${requestBody}</p><p>The above request body escaped quote characters on purpose, as the examples provided in the Survey Monkey docs do so. I have tried calling the API without escaping quote characters also but get same response.</p></div>`)
            })
            .catch(err => {
                console.error(err)
            });
    })
    .get('/displayResponseData', (req, res) => {
        // fetch("https://api.surveymonkey.com/v3/surveys/507708187/pages/30915926/questions/85550481", {
        // fetch("https://api.surveymonkey.com/v3/surveys/507708187/responses/118102182448/details", {
        fetch("https://api.surveymonkey.com/v3/surveys/507708187/responses", {
            "method": "GET",
            "headers": {
                "Accept": "application/json",
                "Authorization": "Bearer tOt-QCvM5tKO73Krcx3KweLYXNYavp3o347bGd3Yfbz9A.-f-y86w.P0tjIc0QDdz-5x.uGIjzZINt6xCF9zXjndw94GLNGWvbzP4TKp7JjqTVgMHaLudzbpaFxvkIHt"
            }
        })
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log(data)
                res.send(data)
            })
            .catch(err => {
                console.error(err)
            });
    })
    .get('/displayCollectorData', (req, res) => {
        fetch("https://api.surveymonkey.com/v3/surveys/507708187/collectors/", {
            "method": "GET",
            "headers": {
                "Accept": "application/json",
                "Authorization": "Bearer tOt-QCvM5tKO73Krcx3KweLYXNYavp3o347bGd3Yfbz9A.-f-y86w.P0tjIc0QDdz-5x.uGIjzZINt6xCF9zXjndw94GLNGWvbzP4TKp7JjqTVgMHaLudzbpaFxvkIHt"
            }
        })
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log(data)
                res.send(data)
            })
            .catch(err => {
                console.error(err)
            });
    })
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))
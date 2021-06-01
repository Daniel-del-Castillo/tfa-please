{
  "type": "Call",
  "operator": {
    "type": "Word",
    "name": "println"
  },
  "args": [
    {
      "type": "Call",
      "operator": {
        "type": "Word",
        "name": "do"
      },
      "args": [
        {
          "type": "Call",
          "operator": {
            "type": "Word",
            "name": "if"
          },
          "args": [
            {
              "type": "Word",
              "name": "false"
            },
            {
              "type": "Value",
              "value": 5
            },
            {
              "type": "Value",
              "value": 4
            }
          ]
        }
      ]
    }
  ]
}
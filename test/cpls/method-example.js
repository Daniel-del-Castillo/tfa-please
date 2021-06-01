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
        "name": "println"
      },
      "args": [
        {
          "type": "MethodCall",
          "operator": {
            "type": "Value",
            "value": "hello"
          },
          "args": [
            {
              "type": "Value",
              "value": "length"
            }
          ]
        }
      ]
    },
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
            "type": "MethodCall",
            "operator": {
              "type": "Value",
              "value": 4
            },
            "args": [
              {
                "type": "Value",
                "value": "toFixed"
              }
            ]
          },
          "args": [
            {
              "type": "Value",
              "value": 2
            }
          ]
        }
      ]
    }
  ]
}
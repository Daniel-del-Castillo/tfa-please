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
                "value": "+"
              },
              {
                "type": "Value",
                "value": 5
              }
            ]
          },
          "args": [
            {
              "type": "Value",
              "value": 3
            }
          ]
        }
      ]
    },
    {
      "type": "Value",
      "value": 12
    }
  ]
}
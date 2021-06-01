{
  "type": "Call",
  "operator": {
    "type": "Word",
    "name": "run"
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
                "value": "-"
              },
              {
                "type": "Value",
                "value": 3
              }
            ]
          },
          "args": []
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
                "value": "/"
              },
              {
                "type": "Value",
                "value": 2
              }
            ]
          },
          "args": []
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
                "value": "*"
              },
              {
                "type": "Value",
                "value": 3
              }
            ]
          },
          "args": []
        }
      ]
    }
  ]
}
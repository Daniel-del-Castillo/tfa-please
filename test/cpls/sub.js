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
        "name": "def"
      },
      "args": [
        {
          "type": "Word",
          "name": "x"
        },
        {
          "type": "Call",
          "operator": {
            "type": "Word",
            "name": "arr"
          },
          "args": [
            {
              "type": "Value",
              "value": 1
            },
            {
              "type": "Call",
              "operator": {
                "type": "Word",
                "name": "arr"
              },
              "args": [
                {
                  "type": "Value",
                  "value": 3
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
              "type": "Word",
              "name": "x"
            },
            "args": [
              {
                "type": "Value",
                "value": "sub"
              }
            ]
          },
          "args": [
            {
              "type": "Value",
              "value": 1
            },
            {
              "type": "Value",
              "value": 1
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
            "type": "Word",
            "name": "element"
          },
          "args": [
            {
              "type": "Word",
              "name": "x"
            },
            {
              "type": "Value",
              "value": 1
            },
            {
              "type": "Value",
              "value": 1
            }
          ]
        }
      ]
    }
  ]
}
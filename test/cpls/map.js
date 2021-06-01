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
        "name": "let"
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
            "name": "array"
          },
          "args": [
            {
              "type": "Value",
              "value": 1
            },
            {
              "type": "Value",
              "value": 2
            },
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
    },
    {
      "type": "Call",
      "operator": {
        "type": "Word",
        "name": "let"
      },
      "args": [
        {
          "type": "Word",
          "name": "inc"
        },
        {
          "type": "Call",
          "operator": {
            "type": "Word",
            "name": "fn"
          },
          "args": [
            {
              "type": "Word",
              "name": "x"
            },
            {
              "type": "Word",
              "name": "i"
            },
            {
              "type": "Word",
              "name": "g"
            },
            {
              "type": "Call",
              "operator": {
                "type": "Word",
                "name": "+"
              },
              "args": [
                {
                  "type": "Word",
                  "name": "x"
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
                "value": "map"
              }
            ]
          },
          "args": [
            {
              "type": "Word",
              "name": "inc"
            }
          ]
        }
      ]
    }
  ]
}
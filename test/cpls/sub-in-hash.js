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
            "name": "map"
          },
          "args": [
            {
              "type": "Value",
              "value": "a"
            },
            {
              "type": "Value",
              "value": 1
            },
            {
              "type": "Value",
              "value": "b"
            },
            {
              "type": "Value",
              "value": 4
            },
            {
              "type": "Value",
              "value": "c"
            },
            {
              "type": "Call",
              "operator": {
                "type": "Word",
                "name": "map"
              },
              "args": [
                {
                  "type": "Value",
                  "value": "d"
                },
                {
                  "type": "Value",
                  "value": 5
                },
                {
                  "type": "Value",
                  "value": "e"
                },
                {
                  "type": "Value",
                  "value": 3
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
              "value": "a"
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
              "value": "c"
            },
            {
              "type": "Value",
              "value": "d"
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
          "type": "MethodCall",
          "operator": {
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
                "value": "c"
              }
            ]
          },
          "args": [
            {
              "type": "Value",
              "value": "e"
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
              "value": "b"
            }
          ]
        }
      ]
    }
  ]
}
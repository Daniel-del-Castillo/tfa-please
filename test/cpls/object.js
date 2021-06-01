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
            "name": "object"
          },
          "args": [
            {
              "type": "Value",
              "value": "c"
            },
            {
              "type": "Value",
              "value": 0
            },
            {
              "type": "Value",
              "value": "gc"
            },
            {
              "type": "Call",
              "operator": {
                "type": "Word",
                "name": "->"
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
                      "name": "self"
                    },
                    {
                      "type": "Value",
                      "value": "c"
                    }
                  ]
                }
              ]
            },
            {
              "type": "Value",
              "value": "sc"
            },
            {
              "type": "Call",
              "operator": {
                "type": "Word",
                "name": "->"
              },
              "args": [
                {
                  "type": "Word",
                  "name": "value"
                },
                {
                  "type": "Call",
                  "operator": {
                    "type": "Word",
                    "name": "="
                  },
                  "args": [
                    {
                      "type": "Word",
                      "name": "self"
                    },
                    {
                      "type": "Value",
                      "value": "c"
                    },
                    {
                      "type": "Word",
                      "name": "value"
                    }
                  ]
                }
              ]
            },
            {
              "type": "Value",
              "value": "inc"
            },
            {
              "type": "Call",
              "operator": {
                "type": "Word",
                "name": "->"
              },
              "args": [
                {
                  "type": "Call",
                  "operator": {
                    "type": "Word",
                    "name": "="
                  },
                  "args": [
                    {
                      "type": "Word",
                      "name": "self"
                    },
                    {
                      "type": "Value",
                      "value": "c"
                    },
                    {
                      "type": "Call",
                      "operator": {
                        "type": "Word",
                        "name": "+"
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
                              "name": "self"
                            },
                            {
                              "type": "Value",
                              "value": "c"
                            }
                          ]
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
                "value": "gc"
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
        "type": "MethodCall",
        "operator": {
          "type": "Word",
          "name": "x"
        },
        "args": [
          {
            "type": "Value",
            "value": "sc"
          }
        ]
      },
      "args": [
        {
          "type": "Value",
          "value": 4
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
                "value": "gc"
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
        "type": "MethodCall",
        "operator": {
          "type": "Word",
          "name": "x"
        },
        "args": [
          {
            "type": "Value",
            "value": "inc"
          }
        ]
      },
      "args": []
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
                "value": "gc"
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
          "type": "MethodCall",
          "operator": {
            "type": "Word",
            "name": "x"
          },
          "args": [
            {
              "type": "Value",
              "value": "c"
            }
          ]
        }
      ]
    }
  ]
}
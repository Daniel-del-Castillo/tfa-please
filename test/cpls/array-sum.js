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
          "name": "sum"
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
              "name": "nums"
            },
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
                    "name": ":="
                  },
                  "args": [
                    {
                      "type": "Word",
                      "name": "i"
                    },
                    {
                      "type": "Value",
                      "value": 0
                    }
                  ]
                },
                {
                  "type": "Call",
                  "operator": {
                    "type": "Word",
                    "name": ":="
                  },
                  "args": [
                    {
                      "type": "Word",
                      "name": "s"
                    },
                    {
                      "type": "Value",
                      "value": 0
                    }
                  ]
                },
                {
                  "type": "Call",
                  "operator": {
                    "type": "Word",
                    "name": "while"
                  },
                  "args": [
                    {
                      "type": "Call",
                      "operator": {
                        "type": "Word",
                        "name": "<"
                      },
                      "args": [
                        {
                          "type": "Word",
                          "name": "i"
                        },
                        {
                          "type": "Call",
                          "operator": {
                            "type": "Word",
                            "name": "length"
                          },
                          "args": [
                            {
                              "type": "Word",
                              "name": "nums"
                            }
                          ]
                        }
                      ]
                    },
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
                            "name": "="
                          },
                          "args": [
                            {
                              "type": "Word",
                              "name": "s"
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
                                  "name": "s"
                                },
                                {
                                  "type": "Call",
                                  "operator": {
                                    "type": "Word",
                                    "name": "element"
                                  },
                                  "args": [
                                    {
                                      "type": "Word",
                                      "name": "nums"
                                    },
                                    {
                                      "type": "Word",
                                      "name": "i"
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
                            "name": "="
                          },
                          "args": [
                            {
                              "type": "Word",
                              "name": "i"
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
                                  "name": "i"
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
                },
                {
                  "type": "Word",
                  "name": "s"
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
            "type": "Word",
            "name": "+"
          },
          "args": [
            {
              "type": "Value",
              "value": "sum(array(1, 2, 3)) := "
            },
            {
              "type": "Call",
              "operator": {
                "type": "Word",
                "name": "sum"
              },
              "args": [
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
}
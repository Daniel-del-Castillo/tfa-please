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
          "name": "d"
        },
        {
          "type": "RegExp",
          "expression": "\n         (?<year>  \\d{4} ) -?  # year\n         (?<month> \\d{2} ) -?  # month\n         (?<day>   \\d{2} )     # day\n        ",
          "flags": "x"
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
              "name": "d"
            },
            "args": [
              {
                "type": "Value",
                "value": "test"
              }
            ]
          },
          "args": [
            {
              "type": "Value",
              "value": "1987-07-14"
            }
          ]
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
          "name": "m"
        },
        {
          "type": "Call",
          "operator": {
            "type": "MethodCall",
            "operator": {
              "type": "Word",
              "name": "d"
            },
            "args": [
              {
                "type": "Value",
                "value": "exec"
              }
            ]
          },
          "args": [
            {
              "type": "Value",
              "value": "1987-07-14"
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
            "type": "Word",
            "name": "m"
          },
          "args": [
            {
              "type": "Value",
              "value": 0
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
            "type": "Word",
            "name": "m"
          },
          "args": [
            {
              "type": "Value",
              "value": "index"
            }
          ]
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
          "name": "x"
        },
        {
          "type": "Call",
          "operator": {
            "type": "MethodCall",
            "operator": {
              "type": "Word",
              "name": "XRegExp"
            },
            "args": [
              {
                "type": "Value",
                "value": "exec"
              }
            ]
          },
          "args": [
            {
              "type": "Value",
              "value": "2015-02-22"
            },
            {
              "type": "Word",
              "name": "d"
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
            "type": "MethodCall",
            "operator": {
              "type": "Word",
              "name": "x"
            },
            "args": [
              {
                "type": "Value",
                "value": "groups"
              }
            ]
          },
          "args": [
            {
              "type": "Value",
              "value": "year"
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
            "type": "MethodCall",
            "operator": {
              "type": "Word",
              "name": "x"
            },
            "args": [
              {
                "type": "Value",
                "value": "groups"
              }
            ]
          },
          "args": [
            {
              "type": "Value",
              "value": "month"
            }
          ]
        }
      ]
    }
  ]
}
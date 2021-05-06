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
          "name": "r"
        },
        {
          "type": "RegExp",
          "expression": "(\\w+)\n           \\s+\n           (\\d+) \n          ",
          "flags": "x"
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
          "type": "Call",
          "operator": {
            "type": "MethodCall",
            "operator": {
              "type": "Word",
              "name": "r"
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
              "value": "a 4"
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
              "name": "r"
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
              "value": ";;; a 42"
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
          "type": "Word",
          "name": "s"
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
          "type": "Word",
          "name": "m"
        }
      ]
    }
  ]
}
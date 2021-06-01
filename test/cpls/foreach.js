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
    },
    {
      "type": "Call",
      "operator": {
        "type": "Word",
        "name": "foreach"
      },
      "args": [
        {
          "type": "Word",
          "name": "x"
        },
        {
          "type": "Word",
          "name": "x"
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
              "name": "x"
            }
          ]
        }
      ]
    }
  ]
}
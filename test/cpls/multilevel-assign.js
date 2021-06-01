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
            "name": "array"
          },
          "args": [
            {
              "type": "Value",
              "value": 1
            },
            {
              "type": "Value",
              "value": 3
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
                  "value": 7
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
        "name": "assign"
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
          "value": 9
        }
      ]
    },
    {
      "type": "Call",
      "operator": {
        "type": "Word",
        "name": "assign"
      },
      "args": [
        {
          "type": "Word",
          "name": "x"
        },
        {
          "type": "Value",
          "value": -1
        },
        {
          "type": "Value",
          "value": 0
        },
        {
          "type": "Value",
          "value": 1000
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
          "name": "x"
        }
      ]
    }
  ]
}
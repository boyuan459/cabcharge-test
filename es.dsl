GET _search
{
  "query": {
    "match_all": {}
  }
}

PUT /lib/
{
  "settings": {
    "index": {
      "number_of_shards": 3,
      "number_of_replicas": 0
    }
  }
}

GET /lib/_settings

GET _all/_settings

PUT /lib/user/3
{
  "first_name": "Jiakang",
  "last_name": "Yuan",
  "age": 2,
  "about": "Life is too short, I love play",
  "interests": ["toy", "fire truck", "garbage truck"]
}

POST /lib/user/
{
  "first_name": "Grace",
  "last_name": "Guo",
  "age": 34,
  "about": "Life is adorable, I love play",
  "interests": ["music"]
}

GET /lib/user/1

POST /lib/user/1/_update
{
  "doc": {
    "age": 32
  }
}

DELETE /lib/user/mJZyhmcBe5IiWL7jNzGc

GET /_mget
{
  "docs": [
    {
      "_index": "lib",
      "_type": "user",
      "_id": 1
    },
    {
      "_index": "lib",
      "_type": "user",
      "_id": 2
    }
    ]
}

GET /lib/user/_mget
{
  "docs": [
    {
      "_id": 1
    },
    {
      "_id": 2
    }
    ]
}

GET /lib/user/_mget
{
  "ids": [1,2]
}

PUT /lib2/
POST /lib2/books/_bulk
{"index": {"_id": 1}}
{"title": "Java", "price": 55}
{"index": {"_id": 2}}
{"title": "Html5", "price": 45}
{"index": {"_id": 3}}
{"title": "JavaScript", "price": 35}
{"index": {"_id": 4}}
{"title": "Python", "price": 50}

GET /lib2/books/_mget
{
  "ids": [1,2,3,4,5]
}

POST /lib2/books/_bulk
{"delete":{"_index": "lib2", "_type": "books", "_id": 4}}
{"create":{"_index": "tt","_type":"ttt","_id":"100"}}
{"name":"lisi"}
{"index":{"_index":"tt","_type":"ttt"}}
{"name":"zhaosi"}
{"update":{"_index":"lib2","_type":"books","_id":"4"}}
{"doc":{"price":58}}

GET /tt/ttt/_mget
{
  "ids": [1,2,3,4,100]
}

GET /lib/user/_mapping

GET /lib/user/_search?q=interests:javascript&sort=age:desc

PUT /lib3/person/1
{
  "name":"Bryan",
  "age":33,
  "dob":"1984-08-08",
  "address": {
    "country": "China",
    "province": "Hubei",
    "city": "Xianning"
  }
}

GET /lib4/books/_mapping

DELETE /lib4

PUT /lib4
{
  "settings": {
    "number_of_shards": 3,
    "number_of_replicas": 0
  },
  "mappings": {
    "books": {
      "properties": {
        "title":{"type": "text"},
        "name":{"type": "text","analyzer": "standard"},
        "publish_date":{"type": "date","index": false},
        "price":{"type": "double"},
        "number":{"type": "integer"}
      }
    }
  }
}

GET /lib/user/_search
{
  "query": {
    "term": {"about": "love"}
  }
}

GET /lib/user/_search
{
  "version": true, 
  "query": {
    "terms": {
      "interests": [
        "python",
        "javascript"
      ]
    }
  }
}

GET /lib/user/_search?timeout=10ms
{
  "query": {
    "match": {
      "about": "life short"
    }
  }
}

GET /lib/user/_search
{
  "_source": ["first_name","interests"], 
  "query": {
    "match": {
      "interests": "java,python"
    }
  }
}

GET /lib/user/_search
{
  "_source": {
    "includes": "first_name",
    "excludes": ["about","last_name"]
  }, 
  "query": {
    "match_all": {}
  }
}

GET /lib/user/_search
{
  "query": {
    "multi_match": {
      "query": "love",
      "fields": ["interests","about"]
    }
  }
}

GET /lib/user/_search
{
  "query": {
    "match_phrase": {
      "about": "love,python"
    }
  }
}

GET /lib/user/_search
{
  "query": {
    "match_all": {}
  },
  "sort": [
    {
      "age": {
        "order": "asc"
      }
    }
  ]
}

GET /lib/user/_search
{
  "query": {
    "match_phrase_prefix": {
      "first_name": {
        "query": "b"
      }
    }
  }
}

GET /lib/user/_search
{
  "query": {
    "range": {
      "age": {
        "gte": 10,
        "lte": 33
      }
    }
  }
}

GET /lib/user/_search
{
  "query": {
    "wildcard": {
      "first_name": {
        "value": "b?"
      }
    }
  }
}

GET /lib/user/_search
{
  "query": {
    "fuzzy": {
      "first_name": "broan"
    }
  }
}

GET /lib/user/_search
{
  "query": {
    "match": {
      "interests": "javascript"
    }
  },
  "highlight": {
    "fields": {
      "interests": {}
    }
  }
}

PUT /lib5
{
  "settings": {
    "number_of_shards": 3,
    "number_of_replicas": 0
  },
  "mappings": {
    "user": {
      "properties": {
        "address":{"type": "text","analyzer": "ik_max_word"},
        "name":{"type": "text","analyzer": "ik_max_word"},
        "dob":{"type": "date","index": false},
        "interests":{"type": "text","analyzer": "ik_max_word"},
        "age":{"type": "integer"}
      }
    }
  }
}

GET /lib5/user/_mapping

PUT /lib5/user/1
{
  "name":"赵六",
  "address":"湖北省咸宁",
  "dob":"1984-01-10",
  "interests":"看书，玩游戏 ",
  "age":50
}

PUT /lib5/user/2
{
  "name":"赵明",
  "address":"广东省",
  "dob":"1984-01-10",
  "interests":"打机 ，看电影",
  "age":50
}

PUT /lib5/user/3
{
  "name":"王五",
  "address":"山西省",
  "dob":"1989-05-10",
  "interests":"打机 ，看电影",
  "age":40
}

GET /lib5/user/_search
{
  "query": {
    "term": {
      "name": "赵"
    }
  }
}

GET /lib5/user/_search
{
  "from": 2, 
  "size": 2, 
  "query": {
    "terms": {
      "interests": [
        "打机",
        "看书"
      ]
    }
  }
}

GET /lib5/user/_search
{
  "query": {
    "match": {
      "name": "赵六"
    }
  }
}

GET /lib5/user/_search
{
  "query": {
    "match_phrase_prefix": {
      "name": {
        "query": "赵"
      }
    }
  }
}

GET /lib5/user/_search
{
  "query": {
    "range": {
      "dob": {
        "from": "1950-01-01",
        "to": "2018-01-01"
      }
    }
  }
}

GET /lib5/user/_search
{
  "query": {
    "bool": {
      "filter": [
        {"terms": {"age": [50]}}
        ]
    }
  }
}

GET /lib5/user/_search
{
  "query": {
    "match_all": {}
  }
}

GET /lib5/user/_search
{
  "query": {
    "bool": {
      "should": [
        {"term": {
          "age": {
            "value": 40
          }
        }},
        {
          "term": {
            "_id": {
              "value": 2
            }
          }
        }
      ],
      "must_not": [
        {
          "term": {
            "age": {
              "value": 34
            }
          }
        }
      ]
    }
  }
}

GET /lib5/user/_search
{
  "query": {
    "bool": {
      "should": [
        {"term": {
          "_id": {
            "value": 2
          }
        }},
        {
          "bool": {
            "must": [
              {"term": {
                "_id": {
                  "value": 1
                }
              }},
              {"term": {
                "age": {
                  "value": 55
                }
              }}
            ]
          }
        }
      ]
    }
  }
}

GET /lib5/user/_search
{
  "query": {
    "bool": {
      "filter": {
        "range": {
          "age": {
            "gte": 10,
            "lte": 40
          }
        }
      }
    }
  }
}

GET /lib5/user/_search
{
  "query": {
    "bool": {
      "filter": {
        "exists": {
          "field": "age"
        }
      }
    }
  }
}

GET /lib5/user/_search
{
  "size": 0, 
  "aggs": {
    "age_of_sum": {
      "sum": {
        "field": "age"
      }
    }
  }
}

GET /lib5/user/_search
{
  "size": 0,
  "aggs": {
    "age_of_min": {
      "min": {
        "field": "age"
      }
    }
  }
}

GET /lib5/user/_search
{
  "size": 0,
  "aggs": {
    "age_of_avg": {
      "avg": {
        "field": "age"
      }
    }
  }
}

GET /lib5/user/_search
{
  "size": 0,
  "aggs": {
    "age_of_cardi": {
      "cardinality": {
        "field": "age"
      }
    }
  }
}

GET /lib5/user/_search
{
  "size": 20,
  "aggs": {
    "age_of_group": {
      "terms": {
        "field": "age"
      }
    }
  }
}

GET /lib5/user/_search
{
  "query": {
    "match": {
      "interests": "打机"
    }
  },
  "aggs": {
    "age_of_group": {
      "terms": {
        "field": "age",
        "order": {
          "age_of_avg": "desc"
        }
      },
      "aggs": {
        "age_of_avg": {
          "avg": {
            "field": "age"
          }
        }
      }
    }
  }
}

GET /lib5/user/_search
{
  "query": {
    "bool": {
      "must": [
        {"match": {
          "interests": "看电影"
        }}
      ],
      "must_not": [
        {"match": {
          "interests": "看书"
        }}
      ],
      "should": [
        {"match": {
          "address": "湖北"
        }},
        {"range": {
          "dob": {
            "gte": "1989-01-10"
          }
        }}
      ]
    }
  }
}

GET /lib5/user/_search
{
  "query": {
    "bool": {
      "must": [
        {"match": {
          "interests": "看电影"
        }}
      ],
      "must_not": [
        {"match": {
          "interests": "看书"
        }}
      ],
      "should": [
        {"match": {
          "address": "湖北"
        }}
      ],
      "filter": {
        "range": {
          "age": {
            "gte": 45
          }
        }
      }
    }
  }
}

GET /lib5/user/_search
{
  "query": {
    "bool": {
      "must": [
        {"match": {
          "interests": "看电影"
        }}
      ],
      "must_not": [
        {"match": {
          "FIELD": "看书"
        }}
      ],
      "should": [
        {"match": {
          "address": "湖北"
        }}
      ],
      "filter": {
        "bool": {
          "must": [
            {"range": {"age": {"gte": 45}}}
            ],
          "must_not": [
            {"term":{"age": 50}}
            ]
        }
      }
    }
  }
}

GET /lib5/user/_search
{
  "query": {
    "constant_score": {
      "filter": {
        "term": {
          "interests": "看书"
        }
      }
    }
  }
}

GET /lib5/_settings

GET _cat/health

GET /lib5/user/1/_update
{
  "script": "ctx._source.age+=1"
}

GET lib/user/_search
{
  "query": {
    "match_all": {}
  }
}

GET /lib5/user/2/_update
{
  "script":"ctx._source.name+='Lucky'"
}

GET /lib/user/mJZyhmcBe5IiWL7jNzGc/_update
{
  "script":{
    "source":"ctx._source.interests.add(params.tag)",
    "params": {
      "tag": "footy"
    }
  }
}

GET /lib/user/3/_update
{
  "script":{
    "source":"ctx._source.interests.remove(ctx._source.interests.indexOf(params.tag))",
    "params":{
      "tag":"toy"
    }
  }
}

GET /lib/user/mJZyhmcBe5IiWL7jNzGc/_update
{
  "script": {
    "source":"ctx.op=ctx._source.age==params.count?'delete':'none'",
    "params":{
      "count":34
    }
  }
}

GET /lib/user/mJZyhmcBe5IiWL7jNzGc/_update
{
  "script":"ctx._source.age+=1",
  "upsert":{
    "first_name": "Jiakang",
    "last_name": "Yuan",
    "age": 2,
    "about": "Life is too short, I love play",
    "interests": [
      "fire truck",
      "garbage truck"
    ]
  }
}

GET _search

GET /*3,*4/_search

GET _all/_search

GET /_all/user,person/_search

GET /lib/user/_search

GET /myindex/article/_search?q=post_date:1984-01-10

GET /lib/user/_search?q=interests:javascript

GET /lib/user/_search?q=javascript,truck

PUT /myindex

PUT /myindex/article/_mapping
{
  "properties": {
    "post_date": {
      "type": "date"
    },
    "title": {
      "type": "text",
      "copy_to": "fullcontents"
    },
    "content": {
      "type": "text",
      "copy_to": "fullcontents"
    },
    "author_id": {
      "type": "integer"
    }
  }
}

GET /myindex/_search

PUT /myindex/article/1
{
  "post_date": "2018-05-10",
  "title": "JavaScript",
  "content": "Javascript is so popular",
  "author_id": 110
}

GET /myindex/article/_search?q=fullcontents:javascript

GET /lib4/user/_search
{
  "query": {
    "match_all": {}
  },
  "sort": [
    {
      "interests.raw": {
        "order": "desc"
      }
    }
  ]
}

DELETE /lib4

PUT /lib4
{
  "settings": {
    "number_of_shards": 3,
    "number_of_replicas": 0
  },
  "mappings": {
    "user": {
      "properties": {
        "address":{"type": "text"},
        "name":{"type": "text"},
        "dob":{"type": "date"},
        "interests":{
          "type": "text",
          "fields": {
            "raw": {
              "type": "keyword"
            }
          },
          "fielddata": true
        },
        "age":{"type": "integer"}
      }
    }
  }
}

PUT /lib6/user/1
{
  "name": "Bo Yuan",
  "address": "Hubei",
  "age": 34,
  "dob": "1985-01-01",
  "interests": "fire truck,garbage truck"
}

PUT /lib4/user/2
{
  "name": "Bryan Yuan",
  "address": "Hubei",
  "age": 2,
  "dob": "1916-01-01",
  "interests": "python,javascript,react.js"
}

GET /lib4/user/_search?explain=true
{
  "query": {
    "match": {
      "interests": "javascript,python"
    }
  }
}

GET /lib4/user/1/_explain
{
  "query": {
    "match": {
      "interests": "javascript,python"
    }
  }
}

GET /lib4/user/_search?scroll=1m
{
  "query": {
    "match_all": {}
  },
  "sort": ["_doc"],
  "size": 3
}

GET /_search/scroll
{
  "scroll": "1m",
  "scroll_id": "DnF1ZXJ5VGhlbkZldGNoAwAAAAAAAANBFlB0ZldyeFlHVDRLUnFPY2pfeWNsN0EAAAAAAAADQhZQdGZXcnhZR1Q0S1JxT2NqX3ljbDdBAAAAAAAAA0MWUHRmV3J4WUdUNEtScU9jal95Y2w3QQ=="
}

PUT /my_index
{
  "mappings": {
    "my_type": {
      "dynamic_templates": [
        {
          "en": {
            "match":"*_en",
            "match_mapping_type": "string",
            "mapping": {
              "type":"text",
              "analyzer":"english"
            }
          }
        }
        ]
    }
  }
}

put /my_index/my_type/1
{
  "title_en": "this is my kitty"
}

put /my_index/my_type/2
{
  "title": "this is my cat"
}

GET /my_index/my_type/_search
{
  "query": {
    "match": {
      "title_en": "is"
    }
  }
}

GET /my_index/my_type/_search
{
  "query": {
    "match": {
      "title": "is"
    }
  }
}

GET /lib5/_search

PUT /lib4/_alias/userlib

PUT /lib6
{
  "settings": {
    "number_of_shards": 3,
    "number_of_replicas": 0
  },
  "mappings": {
    "user": {
      "properties": {
        "address":{"type": "text"},
        "name":{"type": "text"},
        "dob":{"type": "date"},
        "interests":{
          "type": "text",
          "fields": {
            "raw": {
              "type": "keyword"
            }
          },
          "fielddata": true
        },
        "age":{"type": "integer"}
      }
    }
  }
}

GET /lib4/user/_search?scroll=1m
{
  "query": {
    "match_all": {}
  },
  "sort": ["_doc"],
  "size": 3
}

GET /lib6/_search

POST /_aliases
{
  "actions": [
    {"remove":{"index": "lib4","alias":"userlib"}},
    {"add":{"index":"lib6","alias":"userlib"}}
    ]
}

GET /userlib/_search




/*!
 * jQuery QueryBuilder Puppet Support
 * Allows to export rules as a PuppetDB Query statement.
 */

// DEFAULT CONFIG
// ===============================
QueryBuilder.defaults({
    conditions: ['NOT', 'AND', 'OR'],

    operators: [
        {type: 'equal', nb_inputs: 1, multiple: false, apply_to: ['string', 'number', 'datetime', 'boolean']},
        {type: 'regex_match', nb_inputs: 1, multiple: false, apply_to: ['string', 'number']},
        {type: 'regex_array_match', nb_inputs: 1, multiple: false, apply_to: ['string', 'number']},
        {type: 'puppet_equal', nb_inputs: 1, multiple: true, apply_to: ['string', 'number', 'datetime', 'boolean']},
        {type: 'not_equal', nb_inputs: 1, multiple: false, apply_to: ['string', 'number', 'datetime', 'boolean']},
        {type: 'in', nb_inputs: 1, multiple: true, apply_to: ['string', 'number', 'datetime']},
        {type: 'not_in', nb_inputs: 1, multiple: true, apply_to: ['string', 'number', 'datetime']},
        {type: 'less', nb_inputs: 1, multiple: false, apply_to: ['number', 'datetime']},
        {type: 'less_or_equal', nb_inputs: 1, multiple: false, apply_to: ['number', 'datetime']},
        {type: 'puppet_l', nb_inputs: 1, multiple: true, apply_to: ['number', 'datetime']},
        {type: 'puppet_le', nb_inputs: 1, multiple: true, apply_to: ['number', 'datetime']},
        {type: 'greater', nb_inputs: 1, multiple: false, apply_to: ['number', 'datetime']},
        {type: 'greater_or_equal', nb_inputs: 1, multiple: false, apply_to: ['number', 'datetime']},
        {type: 'puppet_g', nb_inputs: 1, multiple: true, apply_to: ['number', 'datetime']},
        {type: 'puppet_ge', nb_inputs: 1, multiple: true, apply_to: ['number', 'datetime']},
        {type: 'puppet_re_match', nb_inputs: 1, multiple: false, apply_to: ['string']},
        {type: 'puppet_re_amatch', nb_inputs: 1, multiple: false, apply_to: ['string']},
        {type: 'between', nb_inputs: 1, multiple: false, apply_to: ['number', 'datetime']},
        {type: 'begins_with', nb_inputs: 1, multiple: false, apply_to: ['string']},
        {type: 'not_begins_with', nb_inputs: 1, multiple: false, apply_to: ['string']},
        {type: 'contains', nb_inputs: 1, multiple: false, apply_to: ['string']},
        {type: 'not_contains', nb_inputs: 1, multiple: false, apply_to: ['string']},
        {type: 'ends_with', nb_inputs: 1, multiple: false, apply_to: ['string']},
        {type: 'not_ends_with', nb_inputs: 1, multiple: false, apply_to: ['string']},
        {type: 'is_empty', nb_inputs: 0, multiple: false, apply_to: ['string']},
        {type: 'is_not_empty', nb_inputs: 0, multiple: false, apply_to: ['string']},
        {type: 'is_null', nb_inputs: 0, multiple: false, apply_to: ['string', 'number', 'datetime', 'boolean']},
        {type: 'is_not_null', nb_inputs: 0, multiple: false, apply_to: ['string', 'number', 'datetime', 'boolean']}
    ],

    puppetOperators: {
        equal: function (v, field) {
            if ($.isNumeric(v[0])) {
                return '["=",' + v[0] + ',' + v[1] + ']';
            }
            return '["=",' + v[0] + ',"' + v[1] + '"]';
        },
        less: function (v, field) {
            if ($.isNumeric(v[1])) {
                return '["<",' + v[0] + ',' + v[1] + ']';
            }
            return '["<",' + v[0] + ',"' + v[1] + '"]';
        },
        less_or_equal: function (v, field) {
            if ($.isNumeric(v[1])) {
                return '["<=",' + v[0] + ',' + v[1] + ']';
            }
            return '["<=",' + v[0] + ',"' + v[1] + '"]';
        },
        greater: function (v, field) {
            if ($.isNumeric(v[1])) {
                return '[">",' + v[0] + ',' + v[1] + ']';
            }
            return '[">",' + v[0] + ',"' + v[1] + '"]';
        },
        greater_or_equal: function (v, field) {
            if ($.isNumeric(v[1])) {
                return '[">=",' + v[0] + ',' + v[1] + ']';
            }
            return '[">=",' + v[0] + ',"' + v[1] + '"]';
        },
        regex_match: function (v, field) {
            return '["~",' + v[0] + ',"' + v[1] + '"]';
        },
        puppet_equal: function (v, subq) {
            if ($.isNumeric(v[1])) {
                return '["=",' + v[0] + ',"' + v[1] + '"]';
            }
            return '["=",' + v[0] + ',"' + v[1] + '"]';
        },
        puppet_l: function (v, subq) {
            if ($.isNumeric(v[1])) {
                return '["<",' + v[0] + ',"' + v[1] + '"]';
            }
            return '["<",' + v[0] + ',"' + v[1] + '"]';
        },
        puppet_le: function (v, subq) {
            if ($.isNumeric(v[1])) {
                return '["<=",' + v[0] + ',"' + v[1] + '"]';
            }
            return '["<=",' + v[0] + ',"' + v[1] + '"]';
        },
        puppet_g: function (v, subq) {
            if ($.isNumeric(v[1])) {
                return '[">",' + v[0] + ',"' + v[1] + '"]';
            }
            return '[">",' + v[0] + ',"' + v[1] + '"]';
        },
        puppet_ge: function (v, subq) {
            if ($.isNumeric(v[1])) {
                return '[">=",' + v[0] + ',"' + v[1] + '"]';
            }
            return '[">=",' + v[0] + ',"' + v[1] + '"]';
        },
        puppet_re_match: function (v, subq) {
            return '["~",' + v[0] + ',"' + v[1] + '"]';
        },
        puppet_re_amatch: function (v, subq) {
            return '["~>",' + v[0] + ',"' + v[1] + '"]';
        },
        is_null: function (v) {
            return null;
        }
    }
});


// PUBLIC METHODS
// ===============================
QueryBuilder.extend({
    /**
     * Get rules as Puppet query
     * @param data {object} (optional) rules
     * @return {object}
     */
    getPuppet: function (data) {
        data = (data === undefined) ? this.getRules() : data;

        var that = this;
        return (function parse(data) {
            if (!data.condition) {
                data.condition = that.settings.default_condition;
            }
            if (['NOT', 'AND', 'OR'].indexOf(data.condition.toUpperCase()) === -1) {
                error('Unable to build Puppet query with condition "{0}"', data.condition);
            }

            if (!data.rules) {
                return {};
            }

            var parts = [];
            var sub_queries = [];
            console.log("------------")
            data.rules.forEach(function (rule) {
                var exists = ("field" in rule);
                if (exists == true) {
                    console.log(exists);
                    if ($.inArray(rule['field'], sub_queries) == -1) {
                        sub_queries.push(rule['field']);
                    }
                }
            });
            console.log(sub_queries);
            sub_queries.forEach(function (subq) {
                var buf = '["in","certname",["extract","certname",["select-' + subq + '",["and",';
                console.log(subq);
                data.rules.forEach(function (rule) {
                    console.log(rule);
                    if (rule.field == subq) {
                        if (rule.rules && rule.rules.length > 0) {
                            parts.push(parse(rule));
                        }
                        else {
                            var mdb = that.settings.puppetOperators[rule.operator],
                                ope = that.getOperatorByType(rule.operator),
                                values = [];

                            if (mdb === undefined) {
                                error('Unknown Puppet operation for operator "{0}"', rule.operator);
                            }
                            if (ope.nb_inputs !== 0) {
                                if (!(rule.value instanceof Array)) {
                                    rule.value = [rule.value];
                                }

                                rule.value.forEach(function (v) {
                                    values.push(changeType(v, rule.type));
                                });
                            }
                            var part = mdb.call(that, values, rule.field);
                            if (buf.substring(buf.length - 1) != ',') {
                                buf = buf.concat(',');
                            }
                            buf = buf.concat(part);
                        }
                    }
                });
                buf = buf.concat(']]]]');
                parts.push(buf);
            });

            var res = "";
            if (parts.length > 0) {
                res += '["' + data.condition.toLowerCase() + '"';
                parts.forEach(function (part) {
                    res += ',' + part;
                });
                res += ']';
            }
            return res;
        }(data));
    },

    /**
     * Convert PuppetDB Query to rules
     * @param data {object} query object
     * @return {object}
     */
    getRulesFromPuppet: function (data) {
        if (data === undefined || data === null) {
            return null;
        }

        var that = this,
            conditions = ['$and', '$or'];

        return (function parse(data) {
            var topKeys = Object.keys(data);

            if (topKeys.length > 1) {
                error('Invalid PuppetDB query format.');
            }
            if (conditions.indexOf(topKeys[0].toLowerCase()) === -1) {
                error('Unable to build Rule from PuppetDB query with condition "{0}"', topKeys[0]);
            }

            var condition = topKeys[0].toLowerCase() === conditions[0] ? 'AND' : 'OR',
                rules = data[topKeys[0]],
                parts = [];

            rules.forEach(function (rule) {
                var keys = Object.keys(rule);

                if (conditions.indexOf(keys[0].toLowerCase()) !== -1) {
                    parts.push(parse(rule));
                }
                else {
                    var field = keys[0],
                        value = rule[field];

                    var operator = that.determineMongoOperator(value, field);
                    if (operator === undefined) {
                        error('Invalid PuppetDB query format.');
                    }

                    var mdbrl = that.settings.mongoRuleOperators[operator];
                    if (mdbrl === undefined) {
                        error('JSON Rule operation unknown for operator "{0}"', operator);
                    }

                    var opVal = mdbrl.call(that, value);
                    parts.push({
                        id: that.change('getMongoDBFieldID', field, value),
                        field: field,
                        operator: opVal.op,
                        value: opVal.val
                    });
                }
            });

            var res = {};
            if (parts.length > 0) {
                res.condition = condition;
                res.rules = parts;
            }
            return res;
        }(data));
    }

});

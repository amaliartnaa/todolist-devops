"use strict";
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilteredSortedTodos = void 0;
var constants_1 = require("./constants");
var getFilteredSortedTodos = function (todos, filterCategory, sortBy) {
  var filtered =
    filterCategory === "All"
      ? todos
      : todos.filter(function (todo) {
          return todo.category === filterCategory;
        });
  if (sortBy === "date") {
    filtered = __spreadArray([], filtered, true).sort(function (a, b) {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
  } else if (sortBy === "priority") {
    filtered = __spreadArray([], filtered, true).sort(function (a, b) {
      return (
        constants_1.priorityOrder[b.priority] -
        constants_1.priorityOrder[a.priority]
      );
    });
  }
  return filtered;
};
exports.getFilteredSortedTodos = getFilteredSortedTodos;

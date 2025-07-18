import React, { useState } from "react";
import {
  Plus,
  Edit3,
  Trash2,
  Check,
  X,
  Filter,
  Search,
  Calendar,
  Clock,
  Star,
  Archive,
  CheckCircle2,
  Circle,
  Sparkles,
} from "lucide-react";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [priority, setPriority] = useState("medium");
  const [sortBy, setSortBy] = useState("newest");

  // Add new todo with enhanced features
  const addTodo = () => {
    if (newTodo.trim()) {
      const todo = {
        id: Date.now(),
        text: newTodo.trim(),
        completed: false,
        priority: priority,
        createdAt: new Date().toISOString(),
        completedAt: null,
        isStarred: false,
        category: "general",
      };
      setTodos([todo, ...todos]);
      setNewTodo("");
    }
  };

  // Toggle todo completion with animation
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
              completedAt: !todo.completed ? new Date().toISOString() : null,
            }
          : todo
      )
    );
  };

  // Toggle star
  const toggleStar = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isStarred: !todo.isStarred } : todo
      )
    );
  };

  // Delete todo
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Archive completed todos
  const archiveCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  // Start editing
  const startEditing = (id, text) => {
    setEditingId(id);
    setEditingText(text);
  };

  // Save edit
  const saveEdit = (id) => {
    if (editingText.trim()) {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, text: editingText.trim() } : todo
        )
      );
    }
    setEditingId(null);
    setEditingText("");
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditingId(null);
    setEditingText("");
  };

  // Enhanced filtering and sorting
  const filteredAndSortedTodos = todos
    .filter((todo) => {
      // Filter by completion status
      if (filter === "active") return !todo.completed;
      if (filter === "completed") return todo.completed;
      if (filter === "starred") return todo.isStarred;
      return true;
    })
    .filter((todo) => {
      // Filter by search term
      return todo.text.toLowerCase().includes(searchTerm.toLowerCase());
    })
    .sort((a, b) => {
      // Sort todos
      if (sortBy === "newest")
        return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === "oldest")
        return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortBy === "priority") {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      if (sortBy === "alphabetical") return a.text.localeCompare(b.text);
      return 0;
    });

  const completedCount = todos.filter((todo) => todo.completed).length;
  const activeCount = todos.length - completedCount;
  const starredCount = todos.filter((todo) => todo.isStarred).length;

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 container mx-auto px-2 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8 max-w-7xl">
        {/* Header with Glassmorphism */}
        <div className="text-center mb-4 sm:mb-6 lg:mb-8 backdrop-blur-sm bg-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-white/20 shadow-2xl">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2 sm:mb-4">
            <Sparkles className="text-purple-400" size={24} />
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Todo Nexus
            </h1>
            <Sparkles className="text-blue-400" size={24} />
          </div>
          <p className="text-white/70 text-sm sm:text-base lg:text-lg">
            Supercharge your productivity with AI-powered organization
          </p>
        </div>

        {/* Enhanced Add Todo Form */}
        <div className="backdrop-blur-sm bg-white/10 rounded-2xl sm:rounded-3xl p-3 sm:p-4 lg:p-6 mb-4 sm:mb-6 lg:mb-8 border border-white/20 shadow-2xl">
          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addTodo()}
                placeholder="What needs to be done? ✨"
                className="flex-1 px-3 sm:px-4 lg:px-6 py-3 sm:py-3 lg:py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-white placeholder-white/50 text-sm sm:text-base lg:text-lg"
              />
              <div className="flex gap-2 sm:gap-3">
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="flex-1 sm:flex-none px-3 sm:px-4 py-3 sm:py-3 lg:py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white text-sm sm:text-base"
                >
                  <option value="high" className="bg-gray-800">
                    🔥 High
                  </option>
                  <option value="medium" className="bg-gray-800">
                    ⚡ Medium
                  </option>
                  <option value="low" className="bg-gray-800">
                    🌱 Low
                  </option>
                </select>
                <button
                  onClick={addTodo}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 sm:px-6 lg:px-8 py-3 sm:py-3 lg:py-4 rounded-xl sm:rounded-2xl hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300 flex items-center gap-1 sm:gap-2 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base whitespace-nowrap"
                >
                  <Plus size={16} className="sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">Add Magic</span>
                  <span className="sm:hidden">Add</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Controls */}
        <div className="backdrop-blur-sm bg-white/10 rounded-2xl sm:rounded-3xl p-3 sm:p-4 lg:p-6 mb-4 sm:mb-6 lg:mb-8 border border-white/20 shadow-2xl">
          <div className="flex flex-col gap-3 sm:gap-4 lg:gap-6">
            {/* Search */}
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50"
                size={16}
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search tasks..."
                className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-white/50 text-sm sm:text-base"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white text-sm sm:text-base"
              >
                <option value="newest" className="bg-gray-800">
                  🕒 Newest
                </option>
                <option value="oldest" className="bg-gray-800">
                  📅 Oldest
                </option>
                <option value="priority" className="bg-gray-800">
                  ⭐ Priority
                </option>
                <option value="alphabetical" className="bg-gray-800">
                  🔤 A-Z
                </option>
              </select>

              {/* Archive Button */}
              <button
                onClick={archiveCompleted}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl sm:rounded-2xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base whitespace-nowrap"
              >
                <Archive size={14} className="sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Archive Done</span>
                <span className="sm:hidden">Archive</span>
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6 lg:mb-8">
          <div className="backdrop-blur-sm bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl sm:rounded-3xl p-3 sm:p-4 lg:p-6 border border-white/20 shadow-2xl">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
              <div className="p-2 sm:p-3 bg-purple-500/30 rounded-xl sm:rounded-2xl">
                <CheckCircle2 className="text-purple-300" size={18} />
              </div>
              <div className="text-center sm:text-left">
                <p className="text-white/70 text-xs sm:text-sm">Total Tasks</p>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
                  {todos.length}
                </p>
              </div>
            </div>
          </div>

          <div className="backdrop-blur-sm bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl sm:rounded-3xl p-3 sm:p-4 lg:p-6 border border-white/20 shadow-2xl">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
              <div className="p-2 sm:p-3 bg-blue-500/30 rounded-xl sm:rounded-2xl">
                <Circle className="text-blue-300" size={18} />
              </div>
              <div className="text-center sm:text-left">
                <p className="text-white/70 text-xs sm:text-sm">Active</p>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
                  {activeCount}
                </p>
              </div>
            </div>
          </div>

          <div className="backdrop-blur-sm bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-2xl sm:rounded-3xl p-3 sm:p-4 lg:p-6 border border-white/20 shadow-2xl">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
              <div className="p-2 sm:p-3 bg-emerald-500/30 rounded-xl sm:rounded-2xl">
                <Check className="text-emerald-300" size={18} />
              </div>
              <div className="text-center sm:text-left">
                <p className="text-white/70 text-xs sm:text-sm">Completed</p>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
                  {completedCount}
                </p>
              </div>
            </div>
          </div>

          <div className="backdrop-blur-sm bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-2xl sm:rounded-3xl p-3 sm:p-4 lg:p-6 border border-white/20 shadow-2xl">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
              <div className="p-2 sm:p-3 bg-yellow-500/30 rounded-xl sm:rounded-2xl">
                <Star className="text-yellow-300" size={18} />
              </div>
              <div className="text-center sm:text-left">
                <p className="text-white/70 text-xs sm:text-sm">Starred</p>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
                  {starredCount}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-4 sm:mb-6 lg:mb-8">
          {["all", "active", "completed", "starred"].map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-3 sm:px-4 lg:px-6 py-2 sm:py-2 lg:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-medium transition-all duration-300 ${
                filter === filterType
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg transform scale-105"
                  : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white backdrop-blur-sm border border-white/20"
              }`}
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </button>
          ))}
        </div>

        {/* Enhanced Todo List */}
        <div className="space-y-4">
          {filteredAndSortedTodos.length === 0 ? (
            <div className="backdrop-blur-sm bg-white/10 rounded-3xl p-16 text-center border border-white/20 shadow-2xl">
              <div className="text-white/40 mb-6">
                <Filter size={64} className="mx-auto" />
              </div>
              <p className="text-white/70 text-xl mb-2">
                {filter === "all" ? "No tasks yet" : `No ${filter} tasks`}
              </p>
              <p className="text-white/50">
                {filter === "all"
                  ? "Create your first task to get started! ✨"
                  : `Try a different filter or create new tasks`}
              </p>
            </div>
          ) : (
            filteredAndSortedTodos.map((todo, index) => (
              <div
                key={todo.id}
                className={`backdrop-blur-sm bg-white/10 rounded-3xl p-6 border border-white/20 shadow-2xl transition-all duration-500 hover:shadow-3xl hover:bg-white/15 transform hover:scale-[1.02] ${
                  todo.completed ? "opacity-60" : ""
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className={`flex-shrink-0 w-8 h-8 rounded-full border-2 transition-all duration-300 flex items-center justify-center transform hover:scale-110 ${
                      todo.completed
                        ? "bg-gradient-to-r from-emerald-500 to-teal-500 border-emerald-500 text-white shadow-lg"
                        : "border-white/30 hover:border-purple-400 hover:bg-white/10"
                    }`}
                  >
                    {todo.completed && <Check size={18} />}
                  </button>

                  <div
                    className={`w-2 h-2 rounded-full ${getPriorityColor(
                      todo.priority
                    )}`}
                  ></div>

                  <div className="flex-1 min-w-0">
                    {editingId === todo.id ? (
                      <input
                        type="text"
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === "Enter" && saveEdit(todo.id)
                        }
                        className="w-full px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                        autoFocus
                      />
                    ) : (
                      <div>
                        <span
                          className={`text-lg font-medium transition-all duration-300 ${
                            todo.completed
                              ? "line-through text-white/50"
                              : "text-white"
                          }`}
                        >
                          {todo.text}
                        </span>
                        <div className="flex items-center gap-4 mt-2 text-white/50 text-sm">
                          <span className="flex items-center gap-1">
                            <Calendar size={12} />
                            {formatDate(todo.createdAt)}
                          </span>
                          {todo.completedAt && (
                            <span className="flex items-center gap-1">
                              <Clock size={12} />
                              Done {formatDate(todo.completedAt)}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleStar(todo.id)}
                      className={`p-2 rounded-xl transition-all duration-300 transform hover:scale-110 ${
                        todo.isStarred
                          ? "text-yellow-400 hover:bg-yellow-500/20"
                          : "text-white/40 hover:text-yellow-400 hover:bg-white/10"
                      }`}
                    >
                      <Star
                        size={18}
                        fill={todo.isStarred ? "currentColor" : "none"}
                      />
                    </button>

                    {editingId === todo.id ? (
                      <>
                        <button
                          onClick={() => saveEdit(todo.id)}
                          className="p-2 text-emerald-400 hover:bg-emerald-500/20 rounded-xl transition-all duration-300 transform hover:scale-110"
                        >
                          <Check size={18} />
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="p-2 text-white/60 hover:bg-white/10 rounded-xl transition-all duration-300 transform hover:scale-110"
                        >
                          <X size={18} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEditing(todo.id, todo.text)}
                          className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-xl transition-all duration-300 transform hover:scale-110"
                        >
                          <Edit3 size={18} />
                        </button>
                        <button
                          onClick={() => deleteTodo(todo.id)}
                          className="p-2 text-red-400 hover:bg-red-500/20 rounded-xl transition-all duration-300 transform hover:scale-110"
                        >
                          <Trash2 size={18} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoApp;

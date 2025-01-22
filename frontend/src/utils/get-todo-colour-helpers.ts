export function getCategoryColour(category: string) {
  switch (category) {
    case "misc":
      return "bg-gray-100 text-gray-800";
    case "work":
      return "bg-blue-100 text-blue-800";
    case "health":
      return "bg-red-100 text-red-800";
    case "food":
      return "bg-yellow-100 text-yellow-800";
    case "finance":
      return "bg-green-100 text-green-800";
    case "travel":
      return "bg-purple-100 text-purple-800";
    case "vacation":
      return "bg-pink-100 text-pink-800";
    case "gift":
      return "bg-fuchsia-100 text-fuchsia-800";
    case "ideas":
      return "bg-indigo-100 text-indigo-800";
  }
}

export function getPriorityColour(priority: string) {
  switch (priority) {
    case "none":
      return "transparent";
    case "low":
      return "green";
    case "medium":
      return "orange";
    case "high":
      return "red";
  }
}

export const formatDateTime = {
  methods: {
    formatNewsDate(date) {
      return `${new Date(date).toLocaleDateString()} ${new Date(date).toLocaleTimeString()}` 
		}
  }
}
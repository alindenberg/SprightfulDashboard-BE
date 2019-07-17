const UserResolvers = {
  Query: {
    getUser: () => {
      return {
        "first_name": "Gary",
        "last_name": "Jones",
        "email": "gary@gmail.com"
      }
    }
  }
}

export default UserResolvers
#DEVTINDER Apis

#AuthRouter
   post /signup
   post/login
   post/logout

#ProfileRouter
   get/profile/view
   patch/profile/edit
   patch/profile/password

#ConnectionRequestRouter
   post/request/send/interested/:userId
   post/request/send/ignored/:userId
   post/request/review/accepted/:acceptedId
   post/request/review/rejected/:rejectedId


#userRouter

  get/user/connections
  get/user/requests
  get/user/feed - gets you the profile of other user in the feed


  status- ignored,interested,accepted,rejected
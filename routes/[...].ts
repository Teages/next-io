export default eventHandler((event) => {
  // redirect to https://cytoid.io/...
  const url = event.node.req.url
  return Response.redirect(`https://cytoid.io${url}`, 301)
})

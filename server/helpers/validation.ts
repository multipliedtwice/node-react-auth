export const validate = (fn, object, res) => {
  const { error } = fn(object)
  if (error)
    return res
      .status(500)
      .json({ error: error.details.map((err) => err.message) })
}
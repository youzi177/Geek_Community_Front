import axios from 'axios'

const getCode = async () => {
  try {
    const response = await axios.get('/public/getCaptcha')

    if (response.status === 200) {
      return response.data
    }

    return null
  } catch (error) {
    console.error(error)
    return null
  }
}

export { getCode }

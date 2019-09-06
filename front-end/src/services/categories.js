import axios from 'axios'

const API_PATH = 'http://localhost:4000/'

const api = axios.create({
    baseURL: API_PATH
})

const getCategories = async (page, limit) => {
    return await api.get(`/categories/?_page=${page}&_limit=${limit}`)
}

const deleteCategory = async (categoryID) => {
    try {
        const response = await api.delete(`/categories/${categoryID}`)

        if (response.status === 200)
            return true
        else
            return false
    }
    catch (error) {
        return false
    }
}

const addCategory = async (category) => {
    try {
        const response = await api.post('/categories/', 
            category,
            {
                headers : {
                    'Content-Type': 'application/json'
                }
            }
        )

        if (response.status === 201)
            return true
        else
            return false
    }
    catch (error) {
        return false
    }
}

const updateCategory = async (category) => {
    try {
        const response = await api.put(`/categories/${category.id}`,
            category,
            {
                headers : {
                    'Content-Type': 'application/json'
                }
            }
        )

        if (response.status === 200)
            return true
        else
            return false
    }
    catch (error) {
        return false
    }
}

export {
    getCategories,
    deleteCategory,
    addCategory,
    updateCategory
}
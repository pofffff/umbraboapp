import { useMutation } from '@apollo/client'
import { CREATE_CATEGORY } from 'services/api'

export const useCategory = () => {
    const [
        CreateCategoryMutation,
        {
            data: createCategoryData,
            loading: createCategoryLoading,
            error: createCategoryError
        }
    ] = useMutation(CREATE_CATEGORY)

    const getCategories = (userId: string) => {}

    return {
        getCategories,
        CreateCategoryMutation,
        createCategoryData,
        createCategoryLoading,
        createCategoryError
    }
}

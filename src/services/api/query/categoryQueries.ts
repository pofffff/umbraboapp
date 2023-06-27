import { gql } from '@apollo/client'

export const CATEGORIES = gql`
  query Categories($userId: ID!) {
    categoryCollection(userId: $userId) {
      categories {
        title
        id
      }
    }
  }
`

export const CATEGORY_COLLECTION = gql`
  query CategoryCollection($userId: ID!) {
    categoryCollection(userId: $userId) {
      categories {
        title
        id
        activities {
          category {
            id
            title
          }
          label
          id
          startDate
          endDate
          totalTimeTraced
          timeRecords {
            id
            date
            amount
          }
        }
      }
    }
  }
`

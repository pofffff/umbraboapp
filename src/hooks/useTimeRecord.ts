import { useMutation } from '@apollo/client'
import { CREATE_TIME_RECORD } from '../services/api'

export const useTimeRecord = () => {
  const [
    CreateTimeRecordMutation,
    {
      data: createTimeRecordData,
      loading: createTimeRecordLoading,
      error: createTimeRecordError
    }
  ] = useMutation(CREATE_TIME_RECORD)

  return {
    CreateTimeRecordMutation,
    createTimeRecordData,
    createTimeRecordLoading,
    createTimeRecordError
  }
}

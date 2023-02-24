import { createAction, createSlice } from "@reduxjs/toolkit"
import { nanoid } from "nanoid"
import commentService from "../services/comment.service"
// import history from "../utils/history"

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    commentsRequested: (state) => {
      state.isLoading = true
    },
    commentsReceived: (state, action) => {
      state.entities = action.payload
      state.isLoading = false
    },
    commentsRequestFailed: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
    commentCreated: (state, action) => {
      state.entities.push(action.payload)
      state.isLoading = false
    },
    commentRemoved: (state, action) => {
      state.entities = state.entities.filter((c) => c.id !== action.payload)
      // state.entities = action.payload
      state.isLoading = false
    }
  }
})

const { reducer: commentsReducer, actions } = commentsSlice
const {
  commentsRequested,
  commentsReceived,
  commentsRequestFailed,
  commentCreated,
  commentRemoved
} = actions

const commentCreateRequested = createAction("users/commentCreateRequested")
const commentRemovedRequested = createAction("users/commentRemovedRequested")
const createCommentFailed = createAction("users/createCommentFailed")
const removeCommentFailed = createAction("users/removeCommentFailed")

export const loadCommentsList = (userId) => async (dispatch) => {
  dispatch(commentsRequested())
  try {
    const { content } = await commentService.getComments(userId)
    dispatch(commentsReceived(content))
  } catch (error) {
    dispatch(commentsRequestFailed(error.message))
  }
}

export const createComment = (payload, userId) => async (dispatch) => {
  dispatch(commentCreateRequested())
  const comment = {
    ...payload,
    _id: nanoid(),
    pageId: userId,
    created_at: Date.now(),
    userId: userId
  }
  try {
    const { content } = await commentService.createComment(comment)
    dispatch(commentCreated(content))
  } catch (error) {
    dispatch(createCommentFailed(error.message))
  }
}

export const removeComment = (commentId) => async (dispatch) => {
  dispatch(commentRemovedRequested())
  try {
    const { content } = await commentService.removeComment(commentId)
    dispatch(commentRemoved(content))
  } catch (error) {
    dispatch(removeCommentFailed(error.message))
  }
}

export const getComments = () => (state) => state.comments.entities
export const getCommentsLoadingStatus = () => (state) =>
  state.comments.isLoading

export default commentsReducer

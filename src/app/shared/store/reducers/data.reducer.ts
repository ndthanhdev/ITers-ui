import {Topic} from "../../models/topic.model";
import {Action} from "@ngrx/store";
import {DataAction} from "../actions/data.action";
import {Thread} from "../../models/thread.model";
import {User} from "../../models/user.model";
import {Account} from "../../models/account.model";
import {ResponseMessage} from "../../models/response-message.model";
import {Post} from "../../models/post.model";
/**
 * Created by vunguyenhung on 2/20/17.
 */

export const initialState = {
  topics: [],
  topic: null,
  thread: {},
  user: null,
  loggedInAccount: null,
  msg: null,
  responseMessage: null
};

export interface DataState {
  topics: Topic[];
  topic: Topic;
  thread: Thread;
  user: User;
  loggedInAccount: Account;
  msg: string;
  responseMessage: ResponseMessage
}

export function reducer(state: DataState = initialState, action: Action): DataState {
  switch (action.type) {
    case DataAction.LOAD_TOPICS:
      return Object.assign({}, state, {topics: action.payload.topics});

    case DataAction.LOAD_TOPIC:
      return Object.assign({}, state, {topic: action.payload.topic});

    case DataAction.LOAD_THREAD:
      return Object.assign({}, state, {thread: action.payload.thread});

    case DataAction.LOAD_USER:
      return Object.assign({}, state, {user: action.payload.user});

    case DataAction.LOGIN:
      return Object.assign({}, state, {loggedInAccount: action.payload.loggedInAccount});

    case DataAction.LOGOUT:
      return Object.assign({}, state, {loggedInAccount: null});

    case DataAction.REGISTER:
      return Object.assign({}, state, {msg: action.payload.msg});

    case DataAction.CREATE_POST:
      return Object.assign({}, state, {responseMessage: action.payload.responseMessage});

    case DataAction.ADD_POST:
      if (state.thread.oldest_posts)
        return Object.assign({}, state, {
          thread: Object.assign({}, state.thread, {oldest_posts: state.thread.oldest_posts.concat(action.payload.post)})
        });

    case DataAction.VOTE_POST:
      return Object.assign({}, state, {responseMessage: action.payload.responseMessage});

    //TODO: refactor this
    case DataAction.ADD_VOTE_POST:
      let clonedPosts = Object.assign([], state.thread.oldest_posts);
      let votedPostIndex = clonedPosts.findIndex(post => post.id === action.payload.postId);
      let votedUserIndex = clonedPosts[votedPostIndex].interacted_users.findIndex(user => user.id === action.payload.loggedInAccount.user.id);
      let votedUser = Object.assign({}, action.payload.loggedInAccount.user);
      votedUser.pivot = {
        post_id: action.payload.postId,
        liked: action.payload.liked
      };
      if (votedUserIndex > -1) {
        if (clonedPosts[votedPostIndex].interacted_users[votedUserIndex].pivot.liked === action.payload.liked)
          clonedPosts[votedPostIndex].interacted_users = [
            ...clonedPosts[votedPostIndex].interacted_users.slice(0, votedUserIndex),
            ...clonedPosts[votedPostIndex].interacted_users.slice(votedUserIndex + 1),
          ];
        else
          clonedPosts[votedPostIndex].interacted_users[votedUserIndex].pivot.liked = action.payload.liked;
      }
      else
        clonedPosts[votedPostIndex].interacted_users.push(votedUser);

      return Object.assign({}, state, {
        thread: Object.assign({}, state.thread, {
          oldest_posts: clonedPosts
        })
      });

    case DataAction.EDIT_POST:
      return Object.assign({}, state, {responseMessage: action.payload.responseMessage});


    case DataAction.ADD_EDIT_POST:
      let clonedToBeEditedPosts = Object.assign([], state, state.thread.oldest_posts);
      let editedPostIndex = clonedToBeEditedPosts.findIndex(post => post.id === action.payload.postId);
      clonedToBeEditedPosts[editedPostIndex].content = action.payload.postContent;
      return Object.assign({}, state, {
        thread: Object.assign({}, state.thread, {
          oldest_posts: clonedToBeEditedPosts
        })
      });

    case DataAction.CREATE_THREAD:
      return Object.assign({}, state, {responseMessage: action.payload.responseMessage});

    case DataAction.ADD_THREAD:
      console.log(action.payload.thread);

      let currentTime = new Date();
      currentTime.setHours(currentTime.getHours() - 7);
      //NOTICE: this is just a walkaround
      let clonedThread: Thread = Object.assign({}, action.payload.thread);

      clonedThread.latest_posts = [new Post({
        user: new User({
          id: action.payload.loggedInAccount.user.id,
          full_name: action.payload.loggedInAccount.user.full_name,
        }),
        created_at: currentTime
      })];

      clonedThread.oldest_posts = [new Post({
        user: new User({
          id: action.payload.loggedInAccount.user.id,
          full_name: action.payload.loggedInAccount.user.full_name
        })
      })];

      return Object.assign({}, state, {
        topic: Object.assign({}, state.topic, {
          latest_threads: [clonedThread, ...state.topic.latest_threads]
        })
      });

    default:
      return state;
  }
}


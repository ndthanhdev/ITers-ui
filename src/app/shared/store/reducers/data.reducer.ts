import {Topic} from "../../models/topic.model";
import {Action} from "@ngrx/store";
import {DataAction} from "../actions/data.action";
import {Thread} from "../../models/thread.model";
import {User} from "../../models/user.model";
import {Account} from "../../models/account.model";
import {ResponseMessage} from "../../models/response-message.model";
import {Post} from "../../models/post.model";
import {Role} from "../../models/role.model";
import {Settings} from "../../models/settings.model";
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
  responseMessage: null,
  unconfirmedPosts: [],
  recentPosts: [],
  settings: null,
  popularThreads: [],
  popularUsers: [],
};

export interface DataState {
  topics: Topic[];
  topic: Topic;
  thread: Thread;
  user: User;
  loggedInAccount: Account;
  msg: string;
  responseMessage: ResponseMessage;
  unconfirmedPosts: Post[],
  recentPosts: Post[],
  settings: Settings,
  popularThreads: Thread[],
  popularUsers: User[],
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
      else return state;

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
          clonedPosts[votedPostIndex].interacted_users.splice(votedUserIndex, 1);
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
      let editedTime = new Date();
      editedTime.setHours(editedTime.getHours() - 7);
      let clonedToBeEditedPosts = Object.assign([], state, state.thread.oldest_posts);
      let editedPostIndex = clonedToBeEditedPosts.findIndex(post => post.id === action.payload.postId);
      clonedToBeEditedPosts[editedPostIndex].content = action.payload.postContent;
      clonedToBeEditedPosts[editedPostIndex].updated_at = editedTime;
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

    case DataAction.EDIT_USER:
      return Object.assign({}, state, {responseMessage: action.payload.responseMessage});

    case DataAction.ADD_EDIT_USER:
      console.log(action.payload.user.full_name);
      return Object.assign({}, state, {
        loggedInAccount: Object.assign({}, state.loggedInAccount, {
          user: Object.assign({}, state.loggedInAccount.user, {
            full_name: action.payload.user.full_name
          })
        })
      });

    case DataAction.UPDATE_ROLE:
      let clonedRole = new Role(state.user.account.current_role);
      clonedRole.privilege_level = action.payload.privilege_level;
      clonedRole.valid_from = new Date();
      return Object.assign({}, state,
        {
          user: Object.assign({}, state.user, {
            account: Object.assign({}, state.user.account, {
              current_role: clonedRole
            })
          })
        }
      );

    case DataAction.SYNC_USER_TOPIC:
      let newTopics: Topic[] = [];
      action.payload.topics.forEach(id => {
        let newTopic = new Topic();
        newTopic.id = id;
        newTopics.push(newTopic);
      });

      return Object.assign({}, state, {
        user: Object.assign({}, state.user, {
          topics: newTopics
        })
      });

    case DataAction.CHANGE_POST_STATE:
      let clonedToBeChangedStatePosts = Object.assign([], state, state.thread.oldest_posts);
      let changedStatePostIndex = clonedToBeChangedStatePosts.findIndex(post => post.id === action.payload.postId);
      if (action.payload.confirmation)
        clonedToBeChangedStatePosts[changedStatePostIndex].confirmed = action.payload.confirmation;
      else
        clonedToBeChangedStatePosts.splice(changedStatePostIndex, 1);

      return Object.assign({}, state, {
        thread: Object.assign({}, state.thread, {
          oldest_posts: clonedToBeChangedStatePosts
        })
      });

    case DataAction.CONFIRM_POST:
      let clonedToBeConfirmedPosts = Object.assign([], state.unconfirmedPosts);
      let toBeConfirmedPostIndex = clonedToBeConfirmedPosts.findIndex(post => post.id === action.payload.postId);
      clonedToBeConfirmedPosts.splice(toBeConfirmedPostIndex, 1);
      return Object.assign({}, state, {
        unconfirmedPosts: clonedToBeConfirmedPosts
      });

    case DataAction.CONFIRM_ACCOUNT:
      return Object.assign({}, state, {
        responseMessage: action.payload.responseMessage,
        user: Object.assign({}, state.user, {
          account: Object.assign({}, state.user.account, {
            confirmed: true
          })
        })
      });

    case DataAction.CREATE_TOPIC:
      return Object.assign({}, state, {responseMessage: action.payload.responseMessage});

    case DataAction.ADD_TOPIC:
      let clonedTopics: Topic[] = Object.assign([], state.topics);
      clonedTopics.push(action.payload.topic);
      return Object.assign({}, state, {
        topics: clonedTopics
      });

    case DataAction.EDIT_TOPIC:
      let tobeEditedClonedTopic: Topic[] = Object.assign([], state.topics);
      let tobeEditedTopic: Topic = tobeEditedClonedTopic.find(topic => topic.id === action.payload.topicId);
      tobeEditedTopic.title = action.payload.topicTitle;
      return Object.assign({}, state, {
        topics: tobeEditedClonedTopic
      });

    case DataAction.LOAD_UNCONFIRMED_POSTS:
      return Object.assign({}, state, {
        unconfirmedPosts: action.payload.unconfirmedPosts
      });

    case DataAction.LOAD_RECENT_POSTS:
      return Object.assign({}, state, {
        recentPosts: action.payload.recentPosts
      });

    case DataAction.LOAD_SETTINGS:
      return Object.assign({}, state, {
        settings: action.payload.settings
      });

    case DataAction.EDIT_SETTINGS:
      return Object.assign({}, state, {
        settings: action.payload.settings
      });

    case DataAction.LOAD_POPULAR_THREADS:
      return Object.assign({}, state, {
        popularThreads: action.payload.popularThreads
      });

    case DataAction.LOAD_POPULAR_USERS:
      return Object.assign({}, state, {
        popularUsers: action.payload.popularUsers
      });

    default:
      return state;
  }
}


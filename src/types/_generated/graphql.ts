export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: Date;
  DateTime: Date;
  Time: Date;
};

export type ActivitiesDeleteInput = {
  activityIds: Array<Scalars['ID']>;
};

export type Activity = {
  __typename?: 'Activity';
  category?: Maybe<Category>;
  createdAt: Scalars['DateTime'];
  endDate?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  label: Scalars['String'];
  owner: User;
  startDate: Scalars['DateTime'];
  timeRecords?: Maybe<Array<Maybe<TimeRecord>>>;
  totalTimeTraced: Scalars['Float'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ActivityCollection = {
  __typename?: 'ActivityCollection';
  activities?: Maybe<Array<Maybe<Activity>>>;
};

export type ActivityCreateInput = {
  categoryId: Scalars['ID'];
  label: Scalars['String'];
  startDate: Scalars['DateTime'];
};

export type ActivityUpdateInput = {
  endDate?: InputMaybe<Scalars['DateTime']>;
  label?: InputMaybe<Scalars['String']>;
  startDate: Scalars['DateTime'];
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String'];
  userId: Scalars['ID'];
};

export type CategoriesDeleteInput = {
  categoryIds: Array<Scalars['ID']>;
};

export type Category = {
  __typename?: 'Category';
  activities?: Maybe<Array<Maybe<Activity>>>;
  id: Scalars['ID'];
  owner: User;
  title: Scalars['String'];
};

export type CategoryAddActivitiesInput = {
  activityIds: Array<Scalars['ID']>;
  categoryId: Scalars['ID'];
};

export type CategoryCollection = {
  __typename?: 'CategoryCollection';
  categories?: Maybe<Array<Maybe<Category>>>;
};

export type CategoryCreateInput = {
  title: Scalars['String'];
};

export type CategoryRemoveActivityInput = {
  activityIds: Array<Scalars['ID']>;
  categoryId: Scalars['ID'];
};

export type CategoryUpdateInput = {
  title: Scalars['String'];
};

export type CreateUserPayload = {
  __typename?: 'CreateUserPayload';
  email?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addActivitiesToCategory?: Maybe<Category>;
  createActivity?: Maybe<Activity>;
  createCategory?: Maybe<Category>;
  createTimeRecord?: Maybe<TimeRecord>;
  createUser?: Maybe<CreateUserPayload>;
  deleteActivities?: Maybe<Array<Maybe<Scalars['ID']>>>;
  deleteCategories?: Maybe<Array<Maybe<Scalars['ID']>>>;
  deleteTimeRecords?: Maybe<Array<Maybe<Scalars['ID']>>>;
  removeActivitiesFromCategory?: Maybe<Category>;
  updateActivity?: Maybe<Activity>;
  updateCategory?: Maybe<Category>;
  updateTimeRecord?: Maybe<TimeRecord>;
  updateUser?: Maybe<User>;
};


export type MutationAddActivitiesToCategoryArgs = {
  input: CategoryAddActivitiesInput;
};


export type MutationCreateActivityArgs = {
  input: ActivityCreateInput;
  userId: Scalars['ID'];
};


export type MutationCreateCategoryArgs = {
  input: CategoryCreateInput;
  userId: Scalars['ID'];
};


export type MutationCreateTimeRecordArgs = {
  input: TimeRecordCreateInput;
  userId: Scalars['ID'];
};


export type MutationCreateUserArgs = {
  input: UserCreateInput;
};


export type MutationDeleteActivitiesArgs = {
  input: ActivitiesDeleteInput;
};


export type MutationDeleteCategoriesArgs = {
  input: CategoriesDeleteInput;
};


export type MutationDeleteTimeRecordsArgs = {
  input: TimeRecordDeleteInput;
};


export type MutationRemoveActivitiesFromCategoryArgs = {
  input: CategoryRemoveActivityInput;
};


export type MutationUpdateActivityArgs = {
  activityId: Scalars['ID'];
  input: ActivityUpdateInput;
};


export type MutationUpdateCategoryArgs = {
  categoryId: Scalars['ID'];
  input: CategoryUpdateInput;
};


export type MutationUpdateTimeRecordArgs = {
  input: TimeRecordUpdateInput;
  timeRecordId: Scalars['ID'];
};


export type MutationUpdateUserArgs = {
  input: UserUpdateInput;
  userId: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  activity?: Maybe<Activity>;
  activityCollection?: Maybe<ActivityCollection>;
  category?: Maybe<Category>;
  categoryCollection?: Maybe<CategoryCollection>;
  getUser?: Maybe<User>;
  loginUser: AuthPayload;
  timeRecord?: Maybe<TimeRecord>;
  timeRecordCollection?: Maybe<TimeRecordCollection>;
};


export type QueryActivityArgs = {
  activityId: Scalars['ID'];
};


export type QueryActivityCollectionArgs = {
  userId: Scalars['ID'];
};


export type QueryCategoryArgs = {
  categoryId: Scalars['ID'];
};


export type QueryCategoryCollectionArgs = {
  userId: Scalars['ID'];
};


export type QueryGetUserArgs = {
  userId: Scalars['ID'];
};


export type QueryLoginUserArgs = {
  input: UserLoginInput;
};


export type QueryTimeRecordArgs = {
  timeRecordId: Scalars['ID'];
};


export type QueryTimeRecordCollectionArgs = {
  activityId: Scalars['ID'];
};

export type TimeRecord = {
  __typename?: 'TimeRecord';
  activity: Activity;
  amount: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  date: Scalars['DateTime'];
  id: Scalars['ID'];
  owner: User;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type TimeRecordCollection = {
  __typename?: 'TimeRecordCollection';
  timeRecords?: Maybe<Array<Maybe<TimeRecord>>>;
};

export type TimeRecordCreateInput = {
  activityId: Scalars['ID'];
  amount: Scalars['Float'];
  date: Scalars['DateTime'];
};

export type TimeRecordDeleteInput = {
  timeRecordIds: Array<Scalars['ID']>;
};

export type TimeRecordUpdateInput = {
  activityId: Scalars['ID'];
  amount?: InputMaybe<Scalars['Float']>;
  date?: InputMaybe<Scalars['DateTime']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  displayName: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['ID'];
};

export type UserCreateInput = {
  displayName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UserLoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UserUpdateInput = {
  displayName?: InputMaybe<Scalars['String']>;
};

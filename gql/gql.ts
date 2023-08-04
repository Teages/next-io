/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query FetchLevelRanking($levelUid: String!, $type: String!, $start: Int!) {\n    chart(levelUid: $levelUid, chartType: $type) {\n      id\n      numPlayers\n      leaderboard(limit: 10, start: $start) {\n        id\n        date\n        owner {\n          id\n          uid\n          name\n          avatar {\n            small\n          }\n        }\n        score\n        accuracy\n        mods\n        details {\n          perfect\n          great\n          good\n          bad\n          miss\n          maxCombo\n        }\n      }\n    }\n  }\n": types.FetchLevelRankingDocument,
    "\n  query FetchNavCard($id: ID!) {\n    profile(id: $id) {\n      id\n      exp {\n        totalExp\n        currentLevelExp\n        nextLevelExp\n        currentLevel\n      }\n      rating\n      header {\n        thumbnail\n      }\n      user {\n        id\n        avatar {\n          original\n        }\n      }\n    }\n  }\n": types.FetchNavCardDocument,
    "\n  query FetchHomePage {\n    discordOnlineCount\n    collectionsCount\n    comments: recentComments(limit: 5) {\n      id\n      category\n      key\n      content\n      date\n      owner {\n        id\n        uid\n        name\n        avatar {\n          small\n        }\n      }\n      metadata\n    }\n    posts: getActivePosts(limit: 10) {\n      id\n      uid\n      title\n      slogan\n      cover {\n        stripe\n      }\n      creationDate\n    }\n    gettingStarted: collection(uid: \"getting-started\") {\n      ...CollectionInfoFragment\n    }\n    hitech: collection(uid: \"hi-tech\") {\n      ...CollectionInfoFragment\n      levels(limit: 5) {\n        ...HomeLevelCardFragment\n      }\n    }\n    latestFeaturedLevels: levels(category: \"featured\", limit:1, sort: CREATION_DATE, order:DESC) {\n      ...HomeLevelCardFragment\n    }\n    levelsCount\n    recentRecords(ranked:true, limit:10) {\n      id\n      date\n      owner {\n        id\n        uid\n        name\n        avatar {\n          small\n        }\n      }\n      chart {\n        id\n        difficulty\n        name\n        type\n        notesCount\n        level {\n          uid\n          title\n          bundle {\n            backgroundImage {\n            stripe\n            }\n          }\n        }\n      }\n      score\n      accuracy\n      rank\n    }\n  }\n  fragment HomeLevelCardFragment on Level {\n    id\n    uid\n    title\n    owner {\n      id\n      uid\n      name\n      avatar {\n        small\n      }\n    }\n    metadata {\n      title_localized\n      artist {\n        name\n      }\n    }\n    charts {\n      type\n      difficulty\n      name\n      notesCount\n    }\n    bundle {\n      backgroundImage {\n        thumbnail\n      }\n      music\n      musicPreview\n    }\n  }\n  fragment CollectionInfoFragment on Collection {\n    id\n    uid\n    title\n    slogan\n    levelCount\n    cover {\n      thumbnail\n    }\n    owner {\n      id\n      uid\n      name\n      avatar {\n        small\n      }\n    }\n  }\n": types.FetchHomePageDocument,
    "\n  query FetchLevel($uid: String!){\n    level(uid: $uid) {\n      id\n      uid\n      title\n      description\n      state\n      censored\n      size\n      tags\n      category\n      creationDate\n      modificationDate\n      owned\n      owner {\n        id\n        uid\n        name\n        avatar { large }\n      }\n      charts {\n        difficulty\n        type\n        name\n        notesCount\n      }\n      metadata {\n        artist {\n          name\n          localized_name\n          url\n        }\n        illustrator {\n          name\n          localized_name\n          url\n        }\n        charter {\n          name\n          localized_name\n          url\n        }\n        storyboarder {\n          name\n          localized_name\n          url\n        }\n      }\n      rating {\n        average\n        total\n        distribution\n        rating\n      }\n      bundle {\n        musicPreview\n        backgroundImage {\n          original\n        }\n      }\n    }\n  }\n": types.FetchLevelDocument,
    "\n  mutation LevelRate($uid: String!, $rating: Int) {\n    rateLevel(id: $uid, rating: $rating) {\n      average\n      total\n      distribution\n      rating\n    }\n  }\n": types.LevelRateDocument,
    "\n  mutation AddToLibrary($levelId: Int!) {\n    addToLibrary(levelId: $levelId)\n  }\n": types.AddToLibraryDocument,
    "\n  mutation RemoveFromLibrary($levelId: Int!) {\n    removeFromLibrary(levelId: $levelId)\n  }\n": types.RemoveFromLibraryDocument,
    "\n  query GetPosts($uid: String!) {\n    page: getPost(uid: $uid) {\n      id\n      uid\n      title\n      slogan\n      content\n      state\n      creationDate\n      modificationDate\n      startDate\n      endDate\n      cover {\n        original\n      }\n    }\n  }\n": types.GetPostsDocument,
    "\n  query GetPost($uid: String!) {\n    post: getPost(uid: $uid) {\n      id\n      uid\n      title\n      type\n      slogan\n      content\n      state\n      creationDate\n      modificationDate\n      startDate\n      endDate\n      cover {\n        original\n      }\n      logo {\n        original\n      }\n      metadata {\n        cover {\n          name\n          localized_name\n          url\n        }\n      }\n      level {\n        ...PostLevelCardFragment\n      }\n      collection {\n        ...PostCollectionInfoFragment\n        levels(limit: 5) {\n          ...PostLevelCardFragment\n        }\n      }\n    }\n  }\n  fragment PostLevelCardFragment on Level {\n    id\n    uid\n    title\n    owner {\n      id\n      uid\n      name\n      avatar {\n        small\n      }\n    }\n    metadata {\n      title_localized\n      artist {\n        name\n      }\n    }\n    bundle {\n      backgroundImage {\n        thumbnail\n      }\n      music\n      musicPreview\n    }\n    charts {\n      type\n      difficulty\n      name\n      notesCount\n    }\n  }\n  fragment PostCollectionInfoFragment on Collection {\n    id\n    uid\n    title\n    slogan\n    cover {\n      thumbnail\n    }\n    owner {\n      id\n      uid\n      name\n      avatar {\n        small\n      }\n    }\n  }\n": types.GetPostDocument,
    "\n  query FetchPosts($skip: Int, $limit: Int!){\n    posts: getPosts(limit: $limit, skip: $skip) {\n      id\n      uid\n      title\n      slogan\n      cover {\n        stripe\n      }\n      creationDate\n    }\n  }\n": types.FetchPostsDocument,
    "\n  query FetchProfilePage($uid: String!) {\n    profile(uid: $uid) {\n      bio\n      header {\n        original\n      }\n      user {\n        id\n        uid\n        name\n        active\n        registrationDate\n        avatar {\n          large\n        }\n        collections(first: 2) {\n          id\n          uid\n          cover {\n            thumbnail\n          }\n          title\n          slogan\n          levelCount\n          creationDate\n        }\n        collectionsCount\n        lastSeen\n        levelsCount(category: \"!featured\")\n        featuredLevelsCount: levelsCount(category: \"featured\")\n        levels(category: \"!featured\", first: 6, sort: MODIFICATION_DATE, order: DESC) { ...LevelInfo }\n        featuredLevels: levels(category: \"featured\", first: 6, sort: MODIFICATION_DATE, order: DESC) { ...LevelInfo }\n      }\n      rating\n      badges {\n        uid\n        title\n        description\n        metadata\n      }\n      recentRecords(limit: 10) {\n        id\n        date\n        chart {\n          id\n          difficulty\n          name\n          type\n          notesCount\n          level {\n            uid\n            title\n            bundle {\n              backgroundImage {\n                stripe\n              }\n            }\n          }\n        }\n        score\n        accuracy\n      }\n      exp {\n        totalExp\n        currentLevelExp\n        nextLevelExp\n        currentLevel\n      }\n      activity {\n        totalRankedPlays\n        totalRankedScore\n        clearedNotes\n        maxCombo\n        averageRankedAccuracy\n        totalPlayTime\n      }\n      timeseries {\n        count\n        cumulativeAccuracy\n        cumulativeRating\n        week\n        year\n      }\n    }\n  }\n  fragment LevelInfo on UserLevel{\n    id\n    uid\n    title\n    metadata {\n      title_localized\n      artist {\n        name\n      }\n    }\n    bundle {\n      backgroundImage {\n        thumbnail\n      }\n      music\n      musicPreview\n    }\n    charts {\n      type\n      difficulty\n      name\n      notesCount\n    }\n  }\n": types.FetchProfilePageDocument,
    "\n  mutation LinkExternalAccount($token: String!) {\n    result: addExternalAccount(token: $token)\n  }\n": types.LinkExternalAccountDocument,
    "\n  mutation ChangePasswordWithToken($password: String!, $token: String!) {\n    success: changePasswordWithToken(password: $password, token: $token)\n  }\n": types.ChangePasswordWithTokenDocument,
    "\n  mutation SendPasswordResetEmail($email: String!){\n    sendResetPasswordEmail(email: $email)\n  }\n": types.SendPasswordResetEmailDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FetchLevelRanking($levelUid: String!, $type: String!, $start: Int!) {\n    chart(levelUid: $levelUid, chartType: $type) {\n      id\n      numPlayers\n      leaderboard(limit: 10, start: $start) {\n        id\n        date\n        owner {\n          id\n          uid\n          name\n          avatar {\n            small\n          }\n        }\n        score\n        accuracy\n        mods\n        details {\n          perfect\n          great\n          good\n          bad\n          miss\n          maxCombo\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query FetchLevelRanking($levelUid: String!, $type: String!, $start: Int!) {\n    chart(levelUid: $levelUid, chartType: $type) {\n      id\n      numPlayers\n      leaderboard(limit: 10, start: $start) {\n        id\n        date\n        owner {\n          id\n          uid\n          name\n          avatar {\n            small\n          }\n        }\n        score\n        accuracy\n        mods\n        details {\n          perfect\n          great\n          good\n          bad\n          miss\n          maxCombo\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FetchNavCard($id: ID!) {\n    profile(id: $id) {\n      id\n      exp {\n        totalExp\n        currentLevelExp\n        nextLevelExp\n        currentLevel\n      }\n      rating\n      header {\n        thumbnail\n      }\n      user {\n        id\n        avatar {\n          original\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query FetchNavCard($id: ID!) {\n    profile(id: $id) {\n      id\n      exp {\n        totalExp\n        currentLevelExp\n        nextLevelExp\n        currentLevel\n      }\n      rating\n      header {\n        thumbnail\n      }\n      user {\n        id\n        avatar {\n          original\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FetchHomePage {\n    discordOnlineCount\n    collectionsCount\n    comments: recentComments(limit: 5) {\n      id\n      category\n      key\n      content\n      date\n      owner {\n        id\n        uid\n        name\n        avatar {\n          small\n        }\n      }\n      metadata\n    }\n    posts: getActivePosts(limit: 10) {\n      id\n      uid\n      title\n      slogan\n      cover {\n        stripe\n      }\n      creationDate\n    }\n    gettingStarted: collection(uid: \"getting-started\") {\n      ...CollectionInfoFragment\n    }\n    hitech: collection(uid: \"hi-tech\") {\n      ...CollectionInfoFragment\n      levels(limit: 5) {\n        ...HomeLevelCardFragment\n      }\n    }\n    latestFeaturedLevels: levels(category: \"featured\", limit:1, sort: CREATION_DATE, order:DESC) {\n      ...HomeLevelCardFragment\n    }\n    levelsCount\n    recentRecords(ranked:true, limit:10) {\n      id\n      date\n      owner {\n        id\n        uid\n        name\n        avatar {\n          small\n        }\n      }\n      chart {\n        id\n        difficulty\n        name\n        type\n        notesCount\n        level {\n          uid\n          title\n          bundle {\n            backgroundImage {\n            stripe\n            }\n          }\n        }\n      }\n      score\n      accuracy\n      rank\n    }\n  }\n  fragment HomeLevelCardFragment on Level {\n    id\n    uid\n    title\n    owner {\n      id\n      uid\n      name\n      avatar {\n        small\n      }\n    }\n    metadata {\n      title_localized\n      artist {\n        name\n      }\n    }\n    charts {\n      type\n      difficulty\n      name\n      notesCount\n    }\n    bundle {\n      backgroundImage {\n        thumbnail\n      }\n      music\n      musicPreview\n    }\n  }\n  fragment CollectionInfoFragment on Collection {\n    id\n    uid\n    title\n    slogan\n    levelCount\n    cover {\n      thumbnail\n    }\n    owner {\n      id\n      uid\n      name\n      avatar {\n        small\n      }\n    }\n  }\n"): (typeof documents)["\n  query FetchHomePage {\n    discordOnlineCount\n    collectionsCount\n    comments: recentComments(limit: 5) {\n      id\n      category\n      key\n      content\n      date\n      owner {\n        id\n        uid\n        name\n        avatar {\n          small\n        }\n      }\n      metadata\n    }\n    posts: getActivePosts(limit: 10) {\n      id\n      uid\n      title\n      slogan\n      cover {\n        stripe\n      }\n      creationDate\n    }\n    gettingStarted: collection(uid: \"getting-started\") {\n      ...CollectionInfoFragment\n    }\n    hitech: collection(uid: \"hi-tech\") {\n      ...CollectionInfoFragment\n      levels(limit: 5) {\n        ...HomeLevelCardFragment\n      }\n    }\n    latestFeaturedLevels: levels(category: \"featured\", limit:1, sort: CREATION_DATE, order:DESC) {\n      ...HomeLevelCardFragment\n    }\n    levelsCount\n    recentRecords(ranked:true, limit:10) {\n      id\n      date\n      owner {\n        id\n        uid\n        name\n        avatar {\n          small\n        }\n      }\n      chart {\n        id\n        difficulty\n        name\n        type\n        notesCount\n        level {\n          uid\n          title\n          bundle {\n            backgroundImage {\n            stripe\n            }\n          }\n        }\n      }\n      score\n      accuracy\n      rank\n    }\n  }\n  fragment HomeLevelCardFragment on Level {\n    id\n    uid\n    title\n    owner {\n      id\n      uid\n      name\n      avatar {\n        small\n      }\n    }\n    metadata {\n      title_localized\n      artist {\n        name\n      }\n    }\n    charts {\n      type\n      difficulty\n      name\n      notesCount\n    }\n    bundle {\n      backgroundImage {\n        thumbnail\n      }\n      music\n      musicPreview\n    }\n  }\n  fragment CollectionInfoFragment on Collection {\n    id\n    uid\n    title\n    slogan\n    levelCount\n    cover {\n      thumbnail\n    }\n    owner {\n      id\n      uid\n      name\n      avatar {\n        small\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FetchLevel($uid: String!){\n    level(uid: $uid) {\n      id\n      uid\n      title\n      description\n      state\n      censored\n      size\n      tags\n      category\n      creationDate\n      modificationDate\n      owned\n      owner {\n        id\n        uid\n        name\n        avatar { large }\n      }\n      charts {\n        difficulty\n        type\n        name\n        notesCount\n      }\n      metadata {\n        artist {\n          name\n          localized_name\n          url\n        }\n        illustrator {\n          name\n          localized_name\n          url\n        }\n        charter {\n          name\n          localized_name\n          url\n        }\n        storyboarder {\n          name\n          localized_name\n          url\n        }\n      }\n      rating {\n        average\n        total\n        distribution\n        rating\n      }\n      bundle {\n        musicPreview\n        backgroundImage {\n          original\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query FetchLevel($uid: String!){\n    level(uid: $uid) {\n      id\n      uid\n      title\n      description\n      state\n      censored\n      size\n      tags\n      category\n      creationDate\n      modificationDate\n      owned\n      owner {\n        id\n        uid\n        name\n        avatar { large }\n      }\n      charts {\n        difficulty\n        type\n        name\n        notesCount\n      }\n      metadata {\n        artist {\n          name\n          localized_name\n          url\n        }\n        illustrator {\n          name\n          localized_name\n          url\n        }\n        charter {\n          name\n          localized_name\n          url\n        }\n        storyboarder {\n          name\n          localized_name\n          url\n        }\n      }\n      rating {\n        average\n        total\n        distribution\n        rating\n      }\n      bundle {\n        musicPreview\n        backgroundImage {\n          original\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation LevelRate($uid: String!, $rating: Int) {\n    rateLevel(id: $uid, rating: $rating) {\n      average\n      total\n      distribution\n      rating\n    }\n  }\n"): (typeof documents)["\n  mutation LevelRate($uid: String!, $rating: Int) {\n    rateLevel(id: $uid, rating: $rating) {\n      average\n      total\n      distribution\n      rating\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddToLibrary($levelId: Int!) {\n    addToLibrary(levelId: $levelId)\n  }\n"): (typeof documents)["\n  mutation AddToLibrary($levelId: Int!) {\n    addToLibrary(levelId: $levelId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveFromLibrary($levelId: Int!) {\n    removeFromLibrary(levelId: $levelId)\n  }\n"): (typeof documents)["\n  mutation RemoveFromLibrary($levelId: Int!) {\n    removeFromLibrary(levelId: $levelId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetPosts($uid: String!) {\n    page: getPost(uid: $uid) {\n      id\n      uid\n      title\n      slogan\n      content\n      state\n      creationDate\n      modificationDate\n      startDate\n      endDate\n      cover {\n        original\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetPosts($uid: String!) {\n    page: getPost(uid: $uid) {\n      id\n      uid\n      title\n      slogan\n      content\n      state\n      creationDate\n      modificationDate\n      startDate\n      endDate\n      cover {\n        original\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetPost($uid: String!) {\n    post: getPost(uid: $uid) {\n      id\n      uid\n      title\n      type\n      slogan\n      content\n      state\n      creationDate\n      modificationDate\n      startDate\n      endDate\n      cover {\n        original\n      }\n      logo {\n        original\n      }\n      metadata {\n        cover {\n          name\n          localized_name\n          url\n        }\n      }\n      level {\n        ...PostLevelCardFragment\n      }\n      collection {\n        ...PostCollectionInfoFragment\n        levels(limit: 5) {\n          ...PostLevelCardFragment\n        }\n      }\n    }\n  }\n  fragment PostLevelCardFragment on Level {\n    id\n    uid\n    title\n    owner {\n      id\n      uid\n      name\n      avatar {\n        small\n      }\n    }\n    metadata {\n      title_localized\n      artist {\n        name\n      }\n    }\n    bundle {\n      backgroundImage {\n        thumbnail\n      }\n      music\n      musicPreview\n    }\n    charts {\n      type\n      difficulty\n      name\n      notesCount\n    }\n  }\n  fragment PostCollectionInfoFragment on Collection {\n    id\n    uid\n    title\n    slogan\n    cover {\n      thumbnail\n    }\n    owner {\n      id\n      uid\n      name\n      avatar {\n        small\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetPost($uid: String!) {\n    post: getPost(uid: $uid) {\n      id\n      uid\n      title\n      type\n      slogan\n      content\n      state\n      creationDate\n      modificationDate\n      startDate\n      endDate\n      cover {\n        original\n      }\n      logo {\n        original\n      }\n      metadata {\n        cover {\n          name\n          localized_name\n          url\n        }\n      }\n      level {\n        ...PostLevelCardFragment\n      }\n      collection {\n        ...PostCollectionInfoFragment\n        levels(limit: 5) {\n          ...PostLevelCardFragment\n        }\n      }\n    }\n  }\n  fragment PostLevelCardFragment on Level {\n    id\n    uid\n    title\n    owner {\n      id\n      uid\n      name\n      avatar {\n        small\n      }\n    }\n    metadata {\n      title_localized\n      artist {\n        name\n      }\n    }\n    bundle {\n      backgroundImage {\n        thumbnail\n      }\n      music\n      musicPreview\n    }\n    charts {\n      type\n      difficulty\n      name\n      notesCount\n    }\n  }\n  fragment PostCollectionInfoFragment on Collection {\n    id\n    uid\n    title\n    slogan\n    cover {\n      thumbnail\n    }\n    owner {\n      id\n      uid\n      name\n      avatar {\n        small\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FetchPosts($skip: Int, $limit: Int!){\n    posts: getPosts(limit: $limit, skip: $skip) {\n      id\n      uid\n      title\n      slogan\n      cover {\n        stripe\n      }\n      creationDate\n    }\n  }\n"): (typeof documents)["\n  query FetchPosts($skip: Int, $limit: Int!){\n    posts: getPosts(limit: $limit, skip: $skip) {\n      id\n      uid\n      title\n      slogan\n      cover {\n        stripe\n      }\n      creationDate\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FetchProfilePage($uid: String!) {\n    profile(uid: $uid) {\n      bio\n      header {\n        original\n      }\n      user {\n        id\n        uid\n        name\n        active\n        registrationDate\n        avatar {\n          large\n        }\n        collections(first: 2) {\n          id\n          uid\n          cover {\n            thumbnail\n          }\n          title\n          slogan\n          levelCount\n          creationDate\n        }\n        collectionsCount\n        lastSeen\n        levelsCount(category: \"!featured\")\n        featuredLevelsCount: levelsCount(category: \"featured\")\n        levels(category: \"!featured\", first: 6, sort: MODIFICATION_DATE, order: DESC) { ...LevelInfo }\n        featuredLevels: levels(category: \"featured\", first: 6, sort: MODIFICATION_DATE, order: DESC) { ...LevelInfo }\n      }\n      rating\n      badges {\n        uid\n        title\n        description\n        metadata\n      }\n      recentRecords(limit: 10) {\n        id\n        date\n        chart {\n          id\n          difficulty\n          name\n          type\n          notesCount\n          level {\n            uid\n            title\n            bundle {\n              backgroundImage {\n                stripe\n              }\n            }\n          }\n        }\n        score\n        accuracy\n      }\n      exp {\n        totalExp\n        currentLevelExp\n        nextLevelExp\n        currentLevel\n      }\n      activity {\n        totalRankedPlays\n        totalRankedScore\n        clearedNotes\n        maxCombo\n        averageRankedAccuracy\n        totalPlayTime\n      }\n      timeseries {\n        count\n        cumulativeAccuracy\n        cumulativeRating\n        week\n        year\n      }\n    }\n  }\n  fragment LevelInfo on UserLevel{\n    id\n    uid\n    title\n    metadata {\n      title_localized\n      artist {\n        name\n      }\n    }\n    bundle {\n      backgroundImage {\n        thumbnail\n      }\n      music\n      musicPreview\n    }\n    charts {\n      type\n      difficulty\n      name\n      notesCount\n    }\n  }\n"): (typeof documents)["\n  query FetchProfilePage($uid: String!) {\n    profile(uid: $uid) {\n      bio\n      header {\n        original\n      }\n      user {\n        id\n        uid\n        name\n        active\n        registrationDate\n        avatar {\n          large\n        }\n        collections(first: 2) {\n          id\n          uid\n          cover {\n            thumbnail\n          }\n          title\n          slogan\n          levelCount\n          creationDate\n        }\n        collectionsCount\n        lastSeen\n        levelsCount(category: \"!featured\")\n        featuredLevelsCount: levelsCount(category: \"featured\")\n        levels(category: \"!featured\", first: 6, sort: MODIFICATION_DATE, order: DESC) { ...LevelInfo }\n        featuredLevels: levels(category: \"featured\", first: 6, sort: MODIFICATION_DATE, order: DESC) { ...LevelInfo }\n      }\n      rating\n      badges {\n        uid\n        title\n        description\n        metadata\n      }\n      recentRecords(limit: 10) {\n        id\n        date\n        chart {\n          id\n          difficulty\n          name\n          type\n          notesCount\n          level {\n            uid\n            title\n            bundle {\n              backgroundImage {\n                stripe\n              }\n            }\n          }\n        }\n        score\n        accuracy\n      }\n      exp {\n        totalExp\n        currentLevelExp\n        nextLevelExp\n        currentLevel\n      }\n      activity {\n        totalRankedPlays\n        totalRankedScore\n        clearedNotes\n        maxCombo\n        averageRankedAccuracy\n        totalPlayTime\n      }\n      timeseries {\n        count\n        cumulativeAccuracy\n        cumulativeRating\n        week\n        year\n      }\n    }\n  }\n  fragment LevelInfo on UserLevel{\n    id\n    uid\n    title\n    metadata {\n      title_localized\n      artist {\n        name\n      }\n    }\n    bundle {\n      backgroundImage {\n        thumbnail\n      }\n      music\n      musicPreview\n    }\n    charts {\n      type\n      difficulty\n      name\n      notesCount\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation LinkExternalAccount($token: String!) {\n    result: addExternalAccount(token: $token)\n  }\n"): (typeof documents)["\n  mutation LinkExternalAccount($token: String!) {\n    result: addExternalAccount(token: $token)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ChangePasswordWithToken($password: String!, $token: String!) {\n    success: changePasswordWithToken(password: $password, token: $token)\n  }\n"): (typeof documents)["\n  mutation ChangePasswordWithToken($password: String!, $token: String!) {\n    success: changePasswordWithToken(password: $password, token: $token)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SendPasswordResetEmail($email: String!){\n    sendResetPasswordEmail(email: $email)\n  }\n"): (typeof documents)["\n  mutation SendPasswordResetEmail($email: String!){\n    sendResetPasswordEmail(email: $email)\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
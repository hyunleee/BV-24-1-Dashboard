import type { GQLReturnType } from '../client/graphql';
import { fetchUser } from '../requests/mutations/fetchUser';

// Space
export type FetchUserRes = NonNullable<GQLReturnType<typeof fetchUser>['fetchUser']>;

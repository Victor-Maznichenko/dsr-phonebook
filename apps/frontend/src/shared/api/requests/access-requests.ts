import type { AccessRequestStatus } from '@/shared/lib';
import { api } from '../instance';

interface GetAccessRequestsParams {
  status?: AccessRequestStatus;
  offset?: number;
  limit?: number;
}

interface PatchAccessRequestParams {
  status: AccessRequestStatus;
  id: number,
}

export const getAccessRequests = ({ limit = 10, offset = 0 }: GetAccessRequestsParams = {}) => api.get<AccessRequestsResponse>('requests', {
  searchParams: {
    status,
    limit,
    offset
  }
}).json();

export const getOutgoingAccessRequests = ({ limit = 10, offset = 0 }: GetAccessRequestsParams = {}) => api.get<AccessRequestsResponse>('requests/outgoing', {
  searchParams: {
    status,
    limit,
    offset
  }
}).json();

export const getIncomingAccessRequests = ({ limit = 10, offset = 0 }: GetAccessRequestsParams = {}) => api.get<AccessRequestsResponse>('requests/incoming', {
  searchParams: {
    status,
    limit,
    offset
  }
}).json();

export const postAccessRequest = (targetUserId: number) => api.patch('requests', { json: { targetUserId } }).json();
export const patchAccessRequest = ({ id, status }: PatchAccessRequestParams) => api.patch<AccessRequestDto>(`requests/${id}`, { json: { status } }).json();
export const deleteAccessRequest = (id: number) => api.delete<number>(`requests/${id}`).json();

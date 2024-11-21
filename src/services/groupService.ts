import { Message } from 'yup/lib/types';
import api from '../config/axios';
import { Group, GroupMember } from '../types/chat';
import { toast } from 'react-toastify';

export class GroupService {
  private static instance: GroupService;
  private readonly baseUrl = '/groups';

  private constructor() {}

  static getInstance(): GroupService {
    if (!GroupService.instance) {
      GroupService.instance = new GroupService();
    }
    return GroupService.instance;
  }

  async getGroups(): Promise<Group[]> {
    const { data } = await api.get<Group[]>(this.baseUrl);
    return data;
  }

  async createGroup(groupData: Partial<Group>): Promise<Group> {
    const { data} = await api.post<Group>(this.baseUrl, groupData);
    return data;
  }

  async updateGroup(groupId: string, updates: Partial<Group>): Promise<Group> {
    const { data } = await api.patch<Group>(`${this.baseUrl}/${groupId}`, updates);
    return data;
  }

  async addMember(groupId: string, userId: string, role: GroupMember['role'] = 'member'): Promise<void> {
    await api.post(`${this.baseUrl}/${groupId}/members`, { userId, role });
  }

  async removeMember(groupId: string, userId: string): Promise<void> {
    await api.delete(`${this.baseUrl}/${groupId}/members/${userId}`);
  }

  async sendMessage(groupId: string, content: string) : Promise<Message> {
    const {data} =await api.post(`${this.baseUrl}/${groupId}/messages`,{content});
    return data;
  }

}

export const groupService = GroupService.getInstance();
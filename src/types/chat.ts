// types/chat.ts
export type MessageType = 'text' | 'image' | 'file';

export interface GroupMember {
    userId: string;
    name: string;
    role: 'admin' | 'member';
    joinedAt: Date;
    lastRead: Date;
    avatar?: string;
  }
  
  export interface GroupLastMessage {
    id: string;
    content: string;
    senderId: string;
    sentAt: Date;
    type: MessageType;
  }
  
  export interface Group {
    _id: string;
    name: string;
    description?: string;
    owner: string;
    members: GroupMember[];
    privacy: 'public' | 'private';
    lastActivityAt: Date;
    lastMessage?: GroupLastMessage;
    avatar?: string;
    messages?: Message[];
  }

  export interface Message {
    id: string;
    senderId: string;
    content: string;
    createdAt: any;
    type: 'text' | 'image' | 'file';
    hasAttachments?: boolean;
    isEdited?: boolean;
}



export type Participant = Group | User;
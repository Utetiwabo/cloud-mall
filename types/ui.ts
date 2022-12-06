export interface AuthUITypes {
  modalOpen: boolean;
}

export interface UITypes {
  auth: AuthUITypes;
}

export interface UISlice {
  auth: AuthUITypes;
  openAuthModal: () => void;
  onCloseAuthModal: () => void;
  onToggleAuthModal: () => void;
}

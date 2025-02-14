import { atom } from 'jotai';
import { ModalConfig } from '@/shared/ui/modal/modal.types';

export const modalAtom = atom<ModalConfig[]>([]);

import { atom } from 'jotai';
import { ModalConfig } from '@/components/modal/modal.types';

export const modalAtom = atom<ModalConfig[]>([]);

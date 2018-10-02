import { Character } from '../characters/character.model';
import { VisualElement } from '../visual-elements/visual-element.model';
import { AudioElement } from '../audio-elements/audio-element.model';
import { ShootLocation } from '../locations/shoot-location.model';

export interface ProjectTreatment {
    logline: string,
    synopsis: string,
    targetAudience: string,
    characters?: Character[],
    locations?: ShootLocation[],
    visualElements?: VisualElement[],
    audioElements?: AudioElement[],
    moodboard?: string[]
}
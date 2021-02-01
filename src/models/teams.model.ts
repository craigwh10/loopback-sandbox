import {Entity, model, property} from '@loopback/repository';

@model()
export class Teams extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  fname: string;

  @property({
    type: 'string',
    required: true,
  })
  lname: string;


  constructor(data?: Partial<Teams>) {
    super(data);
  }
}

export interface TeamsRelations {
  // describe navigational properties here
}

export type TeamsWithRelations = Teams & TeamsRelations;

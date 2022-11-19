import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AddCoin {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    coinId: string;

    @Column({unique: true})
    coinName: string;

    @Column()
    coinPrice: number;

    @Column()
    coinQty: number;

    @Column()
    totalPrice: number;
}

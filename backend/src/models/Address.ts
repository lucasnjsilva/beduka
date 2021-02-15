import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    OneToOne,
} from 'typeorm';

import Contact from './Contact';

@Entity('address')
class Address {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    street: string;

    @Column()
    number: number;

    @Column()
    district: string;

    @Column()
    city: string;

    @Column()
    state: string;

    @Column()
    contact_id: string;

    @OneToOne(() => Contact, {
        cascade: ['insert', 'update'],
    })
    @JoinColumn({ name: 'contact_id' })
    contact: Contact;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Address;

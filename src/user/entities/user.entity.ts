import { Product } from './../../product/entities/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from '../../common/constants/user.constant';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    type: String,
    nullable: false,
  })
  first_name: string;

  @Column({
    type: String,
    nullable: false,
  })
  last_name: string;

  @Column({
    type: String,
    nullable: false,
  })
  phone_number: string;

  @Column({
    nullable: false,
  })
  date_of_birth: string;

  @Column({
    type: String,
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    type: String,
    select: false,
  })
  password: string;

  @Column({
    type: String,
    default: '#',
  })
  profile_image: string;

  @Column({
    default: UserRole.NORMAL,
  })
  role: UserRole;

  @OneToMany(() => Product, (product) => product.user)
  products: Product[];
}

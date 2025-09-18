import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PolicyPlan } from "./policy-plan.entity";

@Entity("policy_categories")
export class PolicyCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", unique: true })
  categoryName: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @OneToMany(() => PolicyPlan, (plan) => plan.category)
  plans: PolicyPlan[];
}

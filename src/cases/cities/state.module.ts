import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { State } from "./entities/state.entity";
import { StateController } from "../controllers/state.controller";
import { StateService } from "./services/state.service";



@Module({
  imports: [TypeOrmModule.forFeature([State])],
  controllers: [StateController],
  providers: [StateService],
  exports: [StateService],
})
export class StateModule {}

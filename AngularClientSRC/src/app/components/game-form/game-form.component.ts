import { Component, HostBinding, OnInit } from '@angular/core';
import { Game } from 'src/app/models/Game';
import { GamesService } from '../../services/games.service';
import { ActivatedRoute,Router } from '@angular/router'

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css']
})
export class GameFormComponent implements OnInit {

  @HostBinding("class") classes ="row";

  game: Game ={
    id:0,
    title:"",
    description:"",
    image:"",
    created_at: new Date()
  };

  edit: boolean = false;

  constructor(private gameService: GamesService, private router : Router, private active : ActivatedRoute) { }
  saveNewGame()
  {
    delete this.game.created_at;
    delete this.game.id;
    this.gameService.saveGame(this.game)
    .subscribe(
      res=>{
        console.log(res);
        this.router.navigate(['/games']);
      },
      err=>console.log(err));
  }
  updateGame(){
    delete this.game.created_at;
    this.gameService.updateGame(this.game.id, this.game)
    .subscribe(
      res=>{
        console.log(res);
        this.router.navigate(['/games']);
      },
      err=>console.log(err));
  }
  ngOnInit(): void {
    const param=this.active.snapshot.params;
    if(param.id)
    {
      this.gameService.getGame(param.id).subscribe(
        res=>{
          console.log(res),
          this.game=res
          this.edit=true;
        }, err=>console.log(err)
      );
    }
   
  }

}

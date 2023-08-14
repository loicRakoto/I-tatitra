<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEnregistrersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('enregistrers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('activite_id')->constrained();
            $table->foreignId('user_id')->constrained();
            $table->foreignId('circonscription_id')->constrained();
            $table->string('recu_mois');
            $table->string('execute_mois');
            $table->string('en_cours_traitement');
            $table->string('paye_non_execute');
            $table->string('remis_mois');
            $table->string('borne');
            $table->string('restaure');
            $table->string('scane');
            $table->string('vectorise');
            $table->string('valide');
            $table->string('bourrage');
            $table->string('decalage');
            $table->string('autres');
            $table->string('demande_speciale');
            $table->string('payes');


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('enregistrers');
    }
}

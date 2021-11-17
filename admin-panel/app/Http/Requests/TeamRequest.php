<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Team;
use Illuminate\Validation\Rule;
class TeamRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return auth()->check();
        // return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => [
                'required',
                Rule::unique((new Team)->getTable())->ignore($this->route()->team->id ?? null)
            ]
        ];
    }
}
